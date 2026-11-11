/**
 * Bilingual Home Page View (`HomePageView`) implementing Page 1 (8 Blocks) of M.Group specification.
 *
 * Uses layout primitives (`Section`, `SectionHeading`, `PageGrid`, `ButtonLink`, `CtaBanner`)
 * and design tokens exclusively.
 */
import Link from 'next/link'

import { CtaBanner } from '@/components/common/cta-banner'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ButtonLink } from '@/components/ui/button'
import { getPageHref } from '@/content/navigation'
import type { Locale, PageId } from '@/i18n/routes'

export interface HomePageViewProps {
  /** Active locale (`vi` or `en`). */
  locale: Locale
}

interface HomeContent {
  hero: {
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
    placeholderCaption: string
  }
  quickFacts: string[]
  intro: {
    title: string
    paragraphs: string[]
    linkLabel: string
  }
  differentiators: {
    title: string
    cards: { title: string; description: string }[]
  }
  solutions: {
    title: string
    description: string
    detailLabel: string
    cards: { title: string; description: string; pageId: PageId }[]
  }
  steps: {
    title: string
    items: { title: string; description: string }[]
  }
  team: {
    title: string
    description: string
    linkLabel: string
    placeholderCaption: string
  }
  cta: {
    title: string
    description: string
    buttonLabel: string
  }
}

const HOME_CONTENT: Record<Locale, HomeContent> = {
  vi: {
    hero: {
      title: 'Nền tảng AI Vision Make in Vietnam,\nchạy ngay trong hạ tầng của đơn vị',
      description:
        'M.Group phát triển COGI AI Vision, nền tảng thị giác máy tính phân tích hình ảnh từ camera và tài liệu, tùy biến theo bài toán của từng khách hàng. M.Group là start-up được ươm tạo của Công viên Công nghệ cao và Đổi mới sáng tạo, Đại học Quốc gia Hà Nội (VNU-TIP).',
      primaryCta: 'Liên hệ tư vấn',
      secondaryCta: 'Xem giải pháp',
      placeholderCaption:
        '[Ảnh hero: hệ thống giám sát camera AI tại chỗ · M.Group – Member of VNU-TIP]',
    },
    quickFacts: [
      'Member of VNU-TIP, Đại học Quốc gia Hà Nội',
      'Nhóm nghiên cứu do TS. Bùi Quang Anh dẫn dắt',
      'Làm chủ mô hình AI và mã nguồn',
      'Chạy hoàn toàn tại chỗ (on-premise)',
    ],
    intro: {
      title: 'Giới thiệu ngắn về M.Group',
      paragraphs: [
        'M.Group là start-up công nghệ được ươm tạo của VNU-TIP. Sản phẩm chủ lực là COGI AI Vision, kết quả nghiên cứu và phát triển của nhóm nghiên cứu do TS. Bùi Quang Anh, chuyên gia thị giác máy tính, dẫn dắt.',
        'Mỗi triển khai bắt đầu từ bài toán của khách hàng: vị trí camera, quy trình nghiệp vụ, ngưỡng cảnh báo. Nền tảng được cấu hình và hiệu chỉnh theo đúng các điều kiện đó.',
      ],
      linkLabel: 'Về M.Group →',
    },
    differentiators: {
      title: 'Điểm khác biệt',
      cards: [
        {
          title: 'Make in Vietnam, làm chủ công nghệ lõi',
          description:
            'Mô hình AI, mã nguồn và dữ liệu huấn luyện do đội ngũ M.Group nghiên cứu, phát triển. Hệ thống không gọi dịch vụ nhận dạng của bên thứ ba.',
        },
        {
          title: 'Tùy biến theo từng bài toán',
          description:
            'Vùng giám sát, ngưỡng cảnh báo, loại đối tượng cần nhận dạng và mẫu báo cáo được thiết lập theo nghiệp vụ của từng đơn vị. Mô hình được hiệu chỉnh trên dữ liệu thực tế tại nơi triển khai.',
        },
        {
          title: 'Chạy hoàn toàn tại chỗ',
          description:
            'Toàn bộ xử lý và lưu trữ nằm trong mạng nội bộ của khách hàng. Hình ảnh và dữ liệu không rời khỏi đơn vị, hệ thống không cần kết nối Internet.',
        },
        {
          title: 'Dùng camera sẵn có',
          description:
            'Kết nối camera IP chuẩn RTSP/ONVIF của nhiều hãng. Đơn vị không phải thay hệ thống camera đang dùng.',
        },
      ],
    },
    solutions: {
      title: 'Giải pháp và sản phẩm',
      description:
        'Các giải pháp chuyên sâu phát triển trên nền tảng COGI AI Vision cho từng lĩnh vực.',
      detailLabel: 'Xem chi tiết →',
      cards: [
        {
          title: 'AI Vision cho Xã/Phường',
          description:
            'Phát hiện lấn chiếm vỉa hè, đỗ xe trái phép, đổ rác sai quy định, tụ tập đông người, xâm nhập vùng cấm. Cảnh báo kèm hình ảnh gửi lực lượng tại chỗ.',
          pageId: 'solution-communes-wards',
        },
        {
          title: 'AI Vision cho Sân bay',
          description:
            'Đo mật độ hành khách theo từng khu vực, cảnh báo quá tải tại check-in, soi chiếu, cửa ra tàu bay. Theo dõi ẩn danh, không nhận dạng khuôn mặt hành khách.',
          pageId: 'solution-airports',
        },
        {
          title: 'AI Vision cho Ngân hàng',
          description:
            'Đo thời gian chờ và thời gian phục vụ tại quầy, kiểm soát mở/đóng kho quỹ, cảnh báo người vào khu vực hạn chế.',
          pageId: 'solution-banks',
        },
        {
          title: 'COGI AI Vision OCR',
          description:
            'Chuyển tài liệu scan thành văn bản và trích xuất các trường thông tin có cấu trúc. Tối ưu cho tiếng Việt, kể cả bảng biểu và chữ viết tay.',
          pageId: 'ocr',
        },
        {
          title: 'Giải pháp khác',
          description:
            'Giải pháp xây dựng theo bài toán và nghiệp vụ riêng của từng đơn vị, trên nền tảng và công nghệ lõi của COGI AI Vision.',
          pageId: 'solution-other',
        },
      ],
    },
    steps: {
      title: 'Hệ thống hoạt động thế nào',
      items: [
        {
          title: 'Kết nối camera sẵn có',
          description:
            'Hệ thống nhận luồng video từ camera IP hiện có của đơn vị qua mạng nội bộ (RTSP/ONVIF).',
        },
        {
          title: 'Phân tích AI tại chỗ',
          description:
            'Máy chủ đặt tại đơn vị chạy các mô hình COGI AI Vision để nhận dạng đối tượng, hành vi hoặc tài liệu.',
        },
        {
          title: 'Cảnh báo & trích xuất dữ liệu',
          description:
            'Gửi cảnh báo kèm hình ảnh trong vài giây tới bộ phận vận hành hoặc trả dữ liệu có cấu trúc cho phần mềm nghiệp vụ.',
        },
      ],
    },
    team: {
      title: 'Đội ngũ nghiên cứu',
      description:
        'Nhóm nghiên cứu phát triển COGI AI Vision do TS. Bùi Quang Anh (Tiến sĩ Khoa học máy tính tại Đại học La Rochelle, Pháp) dẫn dắt, với hơn 15 năm kinh nghiệm nghiên cứu thị giác máy tính và nhận dạng tài liệu.',
      linkLabel: 'Xem đội ngũ →',
      placeholderCaption: '[Ảnh chân dung TS. Bùi Quang Anh & nhóm nghiên cứu]',
    },
    cta: {
      title: 'Trao đổi bài toán của đơn vị',
      description:
        'Cho chúng tôi biết hiện trạng hệ thống camera hoặc loại tài liệu cần xử lý. M.Group sẽ khảo sát và đề xuất phương án phù hợp.',
      buttonLabel: 'Liên hệ tư vấn',
    },
  },
  en: {
    hero: {
      title: 'A Make in Vietnam AI Vision platform\nthat runs inside your own infrastructure',
      description:
        'M.Group develops COGI AI Vision, a computer vision platform that analyses images from cameras and documents and is tailored to each customer’s use case. M.Group is a start-up incubated by VNU Technology and Innovation Park (VNU-TIP).',
      primaryCta: 'Contact us',
      secondaryCta: 'Explore solutions',
      placeholderCaption:
        '[Hero illustration: On-premise AI video analytics · M.Group – Member of VNU-TIP]',
    },
    quickFacts: [
      'Member of VNU-TIP, Vietnam National University, Hanoi',
      'Research team led by Dr. Bui Quang Anh',
      'Full ownership of AI models and source code',
      'Runs entirely on-premise inside your network',
    ],
    intro: {
      title: 'About M.Group',
      paragraphs: [
        'M.Group is a technology start-up incubated by VNU-TIP. Our flagship platform, COGI AI Vision, is the result of research and development led by Dr. Bui Quang Anh, a specialist in computer vision and document recognition.',
        'Every deployment starts from the customer’s situation: camera positions, operating procedures, and alert thresholds. The platform is then configured and tuned to those exact conditions.',
      ],
      linkLabel: 'About M.Group →',
    },
    differentiators: {
      title: 'What sets us apart',
      cards: [
        {
          title: 'Make in Vietnam, core technology ownership',
          description:
            'AI models, source code, and training pipelines are developed in-house by M.Group. The system never calls third-party cloud recognition APIs.',
        },
        {
          title: 'Tailored to each use case',
          description:
            'Monitoring zones, alert thresholds, target object classes, and report templates are configured around each organisation’s operating procedures and tuned on local data.',
        },
        {
          title: 'Runs entirely on-premise',
          description:
            'All video processing and storage stay inside your internal network. Footage and data never leave the premises, and no Internet connection is required.',
        },
        {
          title: 'Works with existing cameras',
          description:
            'Connects to standard RTSP/ONVIF IP cameras from multiple manufacturers without replacing your existing camera infrastructure.',
        },
      ],
    },
    solutions: {
      title: 'Solutions and products',
      description: 'Purpose-built applications powered by the COGI AI Vision platform.',
      detailLabel: 'Learn more →',
      cards: [
        {
          title: 'AI Vision for Communes & Wards',
          description:
            'Detects pavement encroachment, illegal parking, unlawful dumping, crowd gathering, and restricted zone intrusion with instant image alerts.',
          pageId: 'solution-communes-wards',
        },
        {
          title: 'AI Vision for Airports',
          description:
            'Measures passenger density by zone and alerts on congestion at check-in, security screening, and boarding gates using anonymous tracking.',
          pageId: 'solution-airports',
        },
        {
          title: 'AI Vision for Banking',
          description:
            'Measures counter waiting and service times, monitors vault opening/closing procedures, and alerts on restricted area access.',
          pageId: 'solution-banks',
        },
        {
          title: 'COGI AI Vision OCR',
          description:
            'Converts scanned documents into text and extracts structured fields. Optimised for Vietnamese printed forms, complex tables, and handwriting.',
          pageId: 'ocr',
        },
        {
          title: 'Custom solutions',
          description:
            'Solutions built around each organisation’s specific use case and procedures on the COGI AI Vision platform and core technology.',
          pageId: 'solution-other',
        },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        {
          title: 'Connect cameras',
          description:
            'The system ingests video streams from your existing RTSP/ONVIF IP cameras over the local network.',
        },
        {
          title: 'Analyse on-premise',
          description:
            'An on-site server runs COGI AI Vision models to detect objects, behaviours, or document fields.',
        },
        {
          title: 'Alert & integrate',
          description:
            'Sends image-backed alerts within seconds to operators or delivers structured data to your business software.',
        },
      ],
    },
    team: {
      title: 'Research leadership',
      description:
        'COGI AI Vision research and development is led by Dr. Bui Quang Anh (PhD in Computer Science, University of La Rochelle, France), with over 15 years of experience in computer vision and document analysis.',
      linkLabel: 'Meet our team →',
      placeholderCaption: '[Portrait of Dr. Bui Quang Anh & R&D team]',
    },
    cta: {
      title: 'Discuss your requirements',
      description:
        'Tell us about your camera infrastructure or the documents you need to process. M.Group will survey and propose a tailored on-premise approach.',
      buttonLabel: 'Contact us',
    },
  },
}

/**
 * Renders the 8-block Home page for the specified locale.
 *
 * @param props - HomePageView properties.
 * @returns Rendered Home page sections.
 */
export function HomePageView({ locale }: HomePageViewProps) {
  const c = HOME_CONTENT[locale]

  return (
    <>
      {/* Block 1: Hero */}
      <Section tone="subtle">
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex-[1_1_28.75rem] min-w-0 flex flex-col gap-5">
            <SectionHeading
              as="h1"
              title={c.hero.title}
              description={c.hero.description}
              actions={
                <>
                  <ButtonLink href={getPageHref('contact', locale)} variant="primary">
                    {c.hero.primaryCta}
                  </ButtonLink>
                  <ButtonLink href="#solutions" variant="ghost">
                    {c.hero.secondaryCta}
                  </ButtonLink>
                </>
              }
            />
          </div>
          <div className="flex-[1_1_23.75rem] min-w-0 min-h-[17.5rem] rounded-12 border border-border-default bg-wireframe-placeholder p-3 flex items-end">
            <span className="rounded-6 border border-border-default bg-surface-default px-2.5 py-1.5 text-caption text-text-muted">
              {c.hero.placeholderCaption}
            </span>
          </div>
        </div>
      </Section>

      {/* Block 2: Quick Facts Strip */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-12 border border-border-default bg-surface-default overflow-hidden">
          {c.quickFacts.map((fact) => (
            <div
              key={fact}
              className="p-5 text-body-sm font-semibold text-text-primary border-b sm:border-r border-border-subtle last:border-r-0"
            >
              {fact}
            </div>
          ))}
        </div>
      </Section>

      {/* Block 3: Short Introduction */}
      <Section tone="muted">
        <SectionHeading title={c.intro.title} />
        <div className="flex flex-col gap-3 max-w-[53.75rem]">
          {c.intro.paragraphs.map((p) => (
            <p key={p} className="text-body-md text-text-secondary text-pretty m-0">
              {p}
            </p>
          ))}
          <div className="pt-1">
            <Link
              href={getPageHref('about', locale)}
              className="inline-flex items-center min-h-[2.75rem] text-body-md font-semibold text-text-primary no-underline hover:text-text-secondary"
            >
              {c.intro.linkLabel}
            </Link>
          </div>
        </div>
      </Section>

      {/* Block 4: Differentiators (4 cards) */}
      <Section>
        <SectionHeading title={c.differentiators.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.differentiators.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-2.5 rounded-12 border border-border-default bg-surface-default p-5"
            >
              <div
                aria-hidden="true"
                className="h-10 w-10 rounded-10 border border-border-default bg-surface-muted"
              />
              <h3 className="text-h4 text-text-primary m-0">{card.title}</h3>
              <p className="text-body-sm text-text-secondary m-0">{card.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 5: Solutions & Products (5 cards) */}
      <Section id="solutions" tone="muted">
        <SectionHeading title={c.solutions.title} description={c.solutions.description} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.solutions.cards.map((card) => (
            <Link
              key={card.pageId}
              href={getPageHref(card.pageId, locale)}
              className="group flex flex-col justify-between gap-4 rounded-12 border border-border-default bg-surface-default p-5 no-underline transition-shadow duration-[var(--duration-fast)] hover:shadow-soft"
            >
              <div className="flex flex-col gap-3">
                <div className="h-36 w-full rounded-8 border border-border-default bg-wireframe-placeholder" />
                <h3 className="text-h4 text-text-primary m-0">{card.title}</h3>
                <p className="text-body-sm text-text-secondary m-0">{card.description}</p>
              </div>
              <span className="text-body-sm font-semibold text-text-primary group-hover:text-text-accent">
                {c.solutions.detailLabel}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Block 6: How It Works (3 steps) */}
      <Section>
        <SectionHeading title={c.steps.title} />
        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-4">
          {c.steps.items.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-2 rounded-12 border border-border-default bg-surface-default p-5"
            >
              <span className="text-[1.5rem] font-bold text-text-subtle">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong className="text-h4 text-text-primary">{step.title}</strong>
              <p className="text-body-sm text-text-secondary m-0">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Block 7: Research Team Highlight */}
      <Section tone="muted">
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex-[1_1_26rem] min-w-0 flex flex-col gap-4">
            <SectionHeading title={c.team.title} description={c.team.description} />
            <div>
              <Link
                href={getPageHref('team', locale)}
                className="inline-flex items-center min-h-[2.75rem] text-body-md font-semibold text-text-primary no-underline hover:text-text-secondary"
              >
                {c.team.linkLabel}
              </Link>
            </div>
          </div>
          <div className="flex-[1_1_20rem] min-w-0 min-h-[15rem] rounded-12 border border-border-default bg-wireframe-placeholder p-3 flex items-end">
            <span className="rounded-6 border border-border-default bg-surface-default px-2.5 py-1.5 text-caption text-text-muted">
              {c.team.placeholderCaption}
            </span>
          </div>
        </div>
      </Section>

      {/* Block 8: Call-To-Action Strip */}
      <CtaBanner
        locale={locale}
        title={c.cta.title}
        description={c.cta.description}
        buttonLabel={c.cta.buttonLabel}
      />
    </>
  )
}
