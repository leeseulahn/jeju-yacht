import Link from "next/link";
import { Countdown } from "@/components/yacht/Countdown";
import { OceanHero } from "@/components/yacht/OceanHero";
import { ProgramSwiper } from "@/components/yacht/ProgramSwiper";
import { GallerySwiper } from "@/components/yacht/GallerySwiper";
import { TicketCard } from "@/components/yacht/TicketCard";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Pin,
  Plus,
  Sail,
  Users,
} from "@/components/yacht/icons";
import {
  courseStops,
  eventInfo,
  faqs,
  gallery,
  getTicketTypes,
  program,
  sponsors,
  stats,
} from "@/lib/yacht/data";

const HIGHLIGHTS = [
  { icon: Sail, title: "세계 정상급 레이스", text: "16개국 48팀이 겨루는 국제 세일링 그랑프리 시리즈" },
  { icon: Pin, title: "가장 가까운 관람", text: "이호테우 피니시 라인에서 펼쳐지는 박진감 넘치는 결승 구간" },
  { icon: Users, title: "온 가족 페스티벌", text: "하버 콘서트, 푸드트럭 존, 요트 체험까지 즐기는 사흘" },
];

export default function YachtLandingPage() {
  const tickets = getTicketTypes();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="y-hero">
        <img className="y-hero__poster" src="/assets/yacht/hero-poster.svg" alt="" aria-hidden="true" />
        <OceanHero />
        <div className="y-hero__veil" />
        <div className="y-hero__content">
          <p className="y-eyebrow" data-aos="fade-up">
            {eventInfo.dateLabel}
          </p>
          <h1 className="y-hero__title" data-aos="fade-up" data-aos-delay="80">
            <span>제주 바다를</span>
            <span className="y-text-sea">가르는 항해</span>
          </h1>
          <p className="y-hero__sub" data-aos="fade-up" data-aos-delay="160">
            {eventInfo.tagline} — {eventInfo.titleEn} {eventInfo.edition}
          </p>
          <div className="y-hero__meta" data-aos="fade-up" data-aos-delay="220">
            <span>
              <Calendar size={18} /> {eventInfo.dateLabel}
            </span>
            <span>
              <Pin size={18} /> {eventInfo.venue}
            </span>
          </div>
          <Countdown target={eventInfo.startDate} />
          <div className="y-hero__cta" data-aos="fade-up" data-aos-delay="280">
            <Link href="/tickets" className="y-btn y-btn--primary">
              관람권 예매하기 <ArrowRight size={18} />
            </Link>
            <Link href="#about" className="y-btn y-btn--ghost">
              대회 둘러보기
            </Link>
          </div>
        </div>
        <div className="y-scroll-cue">
          SCROLL
          <i />
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="y-section" id="about">
        <div className="y-container y-about">
          <div className="y-about__copy">
            <p className="y-eyebrow" data-aos="fade-up">
              About the Race
            </p>
            <h2 className="y-heading" data-aos="fade-up" data-aos-delay="60">
              바람을 읽는 사람들의 <br />
              가장 푸른 무대
            </h2>
            <p className="y-lead" data-aos="fade-up" data-aos-delay="120">
              {eventInfo.intro}
            </p>
            <ul className="y-feature-list">
              {HIGHLIGHTS.map((item, index) => (
                <li key={item.title} data-aos="fade-up" data-aos-delay={140 + index * 60}>
                  <i>
                    <item.icon size={16} />
                  </i>
                  <span>
                    <strong style={{ color: "var(--y-ink)" }}>{item.title}</strong>
                    <br />
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="y-about__media" data-aos="zoom-in" data-aos-delay="120">
            <img src="/assets/yacht/gallery-3.svg" alt="제주 앞바다를 항해하는 요트" />
            <div className="y-about__badge">{eventInfo.venueShort} · 09.18 OPEN</div>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="y-section--alt" style={{ paddingBlock: "clamp(48px, 7vw, 90px)" }}>
        <div className="y-container">
          <div className="y-stats">
            {stats.map((stat, index) => (
              <div className="y-stat" key={stat.label} data-aos="fade-up" data-aos-delay={index * 70}>
                <strong>
                  {stat.value}
                  <em>{stat.unit}</em>
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROGRAM ---------- */}
      <section className="y-section y-program" id="program">
        <div className="y-container">
          <div className="y-section__head" style={{ marginBottom: 40 }}>
            <p className="y-eyebrow" data-aos="fade-up">
              Schedule
            </p>
            <h2 className="y-heading" data-aos="fade-up" data-aos-delay="60">
              사흘간의 항해 일정
            </h2>
            <p className="y-lead" data-aos="fade-up" data-aos-delay="120">
              개막식부터 메달 레이스까지, 매일 다른 코스와 프로그램이 제주 바다 위에서 펼쳐집니다.
            </p>
          </div>
          <div data-aos="fade-up">
            <ProgramSwiper days={program} />
          </div>
        </div>
      </section>

      {/* ---------- COURSE ---------- */}
      <section className="y-section y-section--alt" id="course">
        <div className="y-container y-course">
          <div className="y-course__map" data-aos="fade-right">
            <img src="/assets/yacht/course-map.svg" alt="제주 한림항에서 이호테우까지 이어지는 경기 코스 지도" />
          </div>
          <div data-aos="fade-left">
            <p className="y-eyebrow">Race Course</p>
            <h2 className="y-heading">제주 해안선을 도는 코스</h2>
            <p className="y-lead" style={{ marginBottom: 28 }}>
              한림항을 출발해 비양도와 애월 해안을 돌아 이호테우에서 결승하는 약 21.8km 코스.
            </p>
            <div className="y-course__stops">
              {courseStops.map((stop, index) => (
                <div className="course-stop" key={stop.name}>
                  <span className="course-stop__no">{index + 1}</span>
                  <span>
                    <span className="course-stop__name">{stop.name}</span>
                    <span className="course-stop__desc">{stop.description}</span>
                  </span>
                  <span className="course-stop__dist">{stop.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="y-section y-gallery" id="gallery">
        <div className="y-container">
          <div className="y-section__head" style={{ marginBottom: 40 }}>
            <p className="y-eyebrow" data-aos="fade-up">
              Gallery
            </p>
            <h2 className="y-heading" data-aos="fade-up" data-aos-delay="60">
              항해의 순간들
            </h2>
          </div>
        </div>
        <div className="y-container" data-aos="fade-up">
          <GallerySwiper items={gallery} />
        </div>
      </section>

      {/* ---------- TICKETS ---------- */}
      <section className="y-section y-section--alt" id="tickets">
        <div className="y-container">
          <div className="y-section__head y-section__head--center" style={{ marginBottom: 44 }}>
            <p className="y-eyebrow" data-aos="fade-up">
              Tickets
            </p>
            <h2 className="y-heading" data-aos="fade-up" data-aos-delay="60">
              관람권 안내
            </h2>
            <p className="y-lead" style={{ marginInline: "auto" }} data-aos="fade-up" data-aos-delay="120">
              해안 관람부터 경기 해상에 직접 동행하는 VIP 승선권까지. 원하는 방식으로 그랑프리를 즐기세요.
            </p>
          </div>
          <div className="y-ticket-grid">
            {tickets.map((ticket, index) => (
              <div data-aos="fade-up" data-aos-delay={index * 70} key={ticket.slug}>
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SPONSORS ---------- */}
      <section className="y-section" style={{ paddingBlock: "clamp(48px, 7vw, 84px)" }}>
        <div className="y-container">
          <p className="y-eyebrow y-section__head--center" style={{ display: "block", textAlign: "center", marginBottom: 32 }}>
            Official Partners
          </p>
        </div>
        <div className="y-sponsors__track" aria-label="공식 후원사">
          <div className="y-sponsors__row">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <span key={`${sponsor.name}-${index}`}>{sponsor.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="y-section y-section--alt">
        <div className="y-container">
          <div className="y-section__head y-section__head--center" style={{ marginBottom: 40 }}>
            <p className="y-eyebrow" data-aos="fade-up">
              FAQ
            </p>
            <h2 className="y-heading" data-aos="fade-up" data-aos-delay="60">
              자주 묻는 질문
            </h2>
          </div>
          <div className="y-faq" data-aos="fade-up">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={22} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="y-section" style={{ paddingTop: 0 }}>
        <div className="y-container">
          <div className="y-cta-band" data-aos="zoom-in">
            <h2>제주 바다 위, 그 현장으로</h2>
            <p>좌석은 한정되어 있습니다. 지금 관람권을 예매하고 잊지 못할 사흘을 함께하세요.</p>
            <Link href="/tickets" className="y-btn y-btn--gold">
              관람권 예매하기 <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
