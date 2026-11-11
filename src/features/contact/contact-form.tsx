'use client'

/**
 * Interactive Contact Inquiry Form (`ContactForm`) implementing Page 9 Block 3.
 *
 * Features:
 * - Client-side validation with `react-hook-form` and `createContactRequestSchema`.
 * - Automatic pre-selection of `topic` when navigated from a solution page (`?topic=...`).
 * - Server-side `422` field error mapping and `5xx`/network retry banner.
 * - Anti-spam honeypot input hidden from visual and assistive technologies.
 * - Full WCAG 2.2 AA accessibility (`aria-invalid`, `aria-describedby`, `role="status"`).
 */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import type { Locale } from '@/i18n/routes'
import { ApiError } from '@/lib/api-client'
import { cn } from '@/lib/cn'

import { submitContactInquiry } from './api'
import {
  type ContactRequestPayload,
  INTEREST_TOPICS,
  INTEREST_TOPIC_LABELS,
  type InterestTopic,
  createContactRequestSchema,
} from './schemas'

export interface ContactFormProps {
  /** Active page locale (`vi` or `en`). */
  locale: Locale
  /** Optional initial topic pre-selected from URL search params. */
  defaultTopic?: InterestTopic
}

interface FormLabels {
  fullName: string
  organisation: string
  position: string
  phone: string
  email: string
  topic: string
  topicPlaceholder: string
  message: string
  consent: string
  submit: string
  submitting: string
  successMessage: string
  submitAnother: string
  genericError: string
}

const FORM_LABELS: Record<Locale, FormLabels> = {
  vi: {
    fullName: 'Họ và tên *',
    organisation: 'Cơ quan / Đơn vị *',
    position: 'Chức vụ',
    phone: 'Điện thoại *',
    email: 'Email *',
    topic: 'Lĩnh vực quan tâm *',
    topicPlaceholder: 'Chọn lĩnh vực…',
    message: 'Nội dung',
    consent: 'Tôi đồng ý để M.Group sử dụng thông tin trên để liên hệ tư vấn. *',
    submit: 'Gửi yêu cầu',
    submitting: 'Đang gửi…',
    successMessage: 'Cảm ơn quý đơn vị. M.Group đã nhận được yêu cầu và sẽ liên hệ lại.',
    submitAnother: 'Gửi yêu cầu khác',
    genericError:
      'Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi trực tiếp 0989 51 66 85.',
  },
  en: {
    fullName: 'Full name *',
    organisation: 'Organisation *',
    position: 'Position',
    phone: 'Phone *',
    email: 'Email *',
    topic: 'Area of interest *',
    topicPlaceholder: 'Select an area…',
    message: 'Message',
    consent: 'I agree that M.Group may use this information to contact me about my enquiry. *',
    submit: 'Send request',
    submitting: 'Sending…',
    successMessage: 'Thank you. M.Group has received your request and will be in touch.',
    submitAnother: 'Send another request',
    genericError:
      'Unable to send your request right now. Please try again or call +84 989 51 66 85.',
  },
}

const INPUT_CLASS =
  'min-h-[2.875rem] w-full rounded-8 border border-border-strong bg-surface-default px-3 py-2 text-[1rem] md:text-body-sm text-text-primary transition-colors focus:border-action-accent focus:outline-none aria-[invalid=true]:border-status-danger'

/**
 * Renders the consultation request form for Page 9.
 *
 * @param props - ContactForm properties.
 * @returns Rendered form or confirmation card.
 */
export function ContactForm({ locale, defaultTopic }: ContactFormProps) {
  const labels = FORM_LABELS[locale]
  const topicLabels = INTEREST_TOPIC_LABELS[locale]
  const [serverError, setServerError] = useState<string | null>(null)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestPayload>({
    resolver: zodResolver(createContactRequestSchema(locale)),
    defaultValues: {
      fullName: '',
      organisation: '',
      position: '',
      phone: '',
      email: '',
      topic: defaultTopic ?? undefined,
      message: '',
      consent: undefined as unknown as true,
      website: '',
    },
  })

  useEffect(() => {
    if (defaultTopic && INTEREST_TOPICS.includes(defaultTopic)) {
      setValue('topic', defaultTopic)
    }
  }, [defaultTopic, setValue])

  async function onSubmit(data: ContactRequestPayload) {
    setServerError(null)
    try {
      await submitContactInquiry(data)
      setSubmittedSuccess(true)
      reset()
    } catch (error) {
      if (error instanceof ApiError && error.status === 422 && error.fields) {
        for (const [fieldName, message] of Object.entries(error.fields)) {
          setError(fieldName as keyof ContactRequestPayload, {
            type: 'server',
            message,
          })
        }
        return
      }
      setServerError(labels.genericError)
    }
  }

  if (submittedSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col gap-4 rounded-12 border border-border-default bg-surface-default p-6 max-w-[56.25rem]"
      >
        <p className="text-body-lg font-semibold text-text-primary m-0">{labels.successMessage}</p>
        <div>
          <Button variant="ghost" onClick={() => setSubmittedSuccess(false)}>
            {labels.submitAnother}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 max-w-[56.25rem]"
    >
      {serverError ? (
        <div
          role="alert"
          className="rounded-8 border border-status-danger bg-surface-default p-4 text-body-sm text-status-danger font-medium"
        >
          {serverError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-fullName"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.fullName}
          </label>
          <input
            id="contact-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'contact-fullName-error' : undefined}
            className={INPUT_CLASS}
            {...register('fullName')}
          />
          {errors.fullName ? (
            <span id="contact-fullName-error" className="text-caption text-status-danger">
              {errors.fullName.message}
            </span>
          ) : null}
        </div>

        {/* Organisation */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-organisation"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.organisation}
          </label>
          <input
            id="contact-organisation"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={errors.organisation ? 'contact-organisation-error' : undefined}
            className={INPUT_CLASS}
            {...register('organisation')}
          />
          {errors.organisation ? (
            <span id="contact-organisation-error" className="text-caption text-status-danger">
              {errors.organisation.message}
            </span>
          ) : null}
        </div>

        {/* Position */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-position"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.position}
          </label>
          <input
            id="contact-position"
            type="text"
            autoComplete="organization-title"
            className={INPUT_CLASS}
            {...register('position')}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.phone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className={INPUT_CLASS}
            {...register('phone')}
          />
          {errors.phone ? (
            <span id="contact-phone-error" className="text-caption text-status-danger">
              {errors.phone.message}
            </span>
          ) : null}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.email}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={INPUT_CLASS}
            {...register('email')}
          />
          {errors.email ? (
            <span id="contact-email-error" className="text-caption text-status-danger">
              {errors.email.message}
            </span>
          ) : null}
        </div>

        {/* Area of Interest */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-topic"
            className="text-[0.875rem] font-semibold text-text-primary"
          >
            {labels.topic}
          </label>
          <select
            id="contact-topic"
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
            className={INPUT_CLASS}
            defaultValue={defaultTopic ?? ''}
            {...register('topic')}
          >
            <option value="" disabled>
              {labels.topicPlaceholder}
            </option>
            {INTEREST_TOPICS.map((topicKey) => (
              <option key={topicKey} value={topicKey}>
                {topicLabels[topicKey]}
              </option>
            ))}
          </select>
          {errors.topic ? (
            <span id="contact-topic-error" className="text-caption text-status-danger">
              {errors.topic.message}
            </span>
          ) : null}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-[0.875rem] font-semibold text-text-primary"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={cn(INPUT_CLASS, 'min-h-[6.875rem] resize-y')}
          {...register('message')}
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex flex-col gap-1.5">
        <label className="inline-flex items-start gap-3 cursor-pointer text-body-sm text-text-secondary">
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
            className="mt-1 h-4 w-4 shrink-0 rounded-4 border border-border-strong accent-action-primary"
            {...register('consent')}
          />
          <span>{labels.consent}</span>
        </label>
        {errors.consent ? (
          <span id="contact-consent-error" className="text-caption text-status-danger">
            {errors.consent.message}
          </span>
        ) : null}
      </div>

      {/* Hidden Honeypot Field for Bot Protection */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </div>
    </form>
  )
}
