import Link from "next/link";
import { Countdown } from "@/components/yacht/Countdown";
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
    <div className="y-home">
      {/* ---------- COVER ---------- */}
      <section className="y-cover" id="top">
        <p className="y-cover__eyebrow">{eventInfo.dateLabel}</p>
        <h1 className="y-cover__title" aria-label={`${eventInfo.titleEn} ${eventInfo.edition}`}>
          <span className="y-cover__line">
            <span className="y-cover__word" style={{ animationDelay: "0ms" }}>
              JEJU
            </span>
            <span className="y-cover__window" style={{ animationDelay: "260ms" }}>
              <img src="/assets/yacht/gallery-1.svg" alt="" aria-hidden="true" />
            </span>
            <span className="y-cover__word" style={{ animationDelay: "150ms" }}>
              SAILING
            </span>
          </span>
          <span className="y-cover__line">
            <span className="y-cover__word" style={{ animationDelay: "300ms" }}>
              GRAND
            </span>
            <span className="y-cover__word" style={{ animationDelay: "420ms" }}>
              PRIX
            </span>
            <span className="y-cover__window" style={{ animationDelay: "560ms" }}>
              <img src="/assets/yacht/gallery-3.svg" alt="" aria-hidden="true" />
            </span>
          </span>
        </h1>
        <p className="y-cover__sub">
          {eventInfo.tagline} · {eventInfo.edition}
        </p>
        <div className="y-cover__meta">
          <span>
            <Calendar size={18} /> {eventInfo.dateLabel}
          </span>
          <span>
            <Pin size={18} /> {eventInfo.venue}
          </span>
        </div>
        <Countdown target={eventInfo.startDate} />
        <div className="y-cover__cta">
          <Link href="/tickets" className="y-btn y-btn--primary">
            관람권 예매하기 <ArrowRight size={18} />
          </Link>
          <Link href="#about" className="y-btn y-btn--outline">
            대회 둘러보기
          </Link>
        </div>
        <Link href="#about" className="y-scroll-cue" aria-label="아래로 스크롤">
          SCROLL
          <i />
        </Link>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="y-block y-block--light y-why" id="about">
        <div className="y-why__media">
          <img
            src="/assets/yacht/gallery-3.svg"
            alt="제주 앞바다를 항해하는 요트"
            data-aos="fade-up"
            data-aos-delay="0"
          />
          <img
            src="/assets/yacht/gallery-2.svg"
            alt="반환점을 도는 요트"
            data-aos="fade-up"
            data-aos-delay="120"
          />
          <img
            src="/assets/yacht/gallery-1.svg"
            alt="스피니커를 펼친 요트"
            data-aos="fade-up"
            data-aos-delay="220"
          />
        </div>
        <div className="y-why__text">
          <p className="y-eyebrow" data-aos="fade-up">
            About the Race
          </p>
          <h2 className="y-display" data-aos="fade-up" data-aos-delay="80">
            바람을 읽는 사람들의
            <br />
            가장 푸른 무대
          </h2>
          <p className="y-body" data-aos="fade-up" data-aos-delay="160">
            {eventInfo.intro}
          </p>
          <ul className="y-why__points" data-aos="fade-up" data-aos-delay="220">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <i>
                  <item.icon size={18} />
                </i>
                <span>
                  <strong>{item.title}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="y-block y-block--light y-stats-block">
        <div className="y-stats">
          {stats.map((stat, index) => (
            <div className="y-stat" key={stat.label} data-aos="fade-up" data-aos-delay={index * 80}>
              <strong>
                {stat.value}
                <em>{stat.unit}</em>
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PROGRAM (dark) ---------- */}
      <section className="y-block y-block--dark y-program" id="program" data-nav-dark>
        <div className="y-block__inner">
          <h2 className="y-display y-display--section" data-aos="fade-up">
            <span className="y-eyebrow y-eyebrow--invert">Schedule</span>
            사흘간의 항해 일정
          </h2>
          <div className="y-rows">
            {program.map((day, index) => (
              <article className="y-row" key={day.day} data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="y-row__head">
                  <span className="y-row__day">{day.day}</span>
                  <span className="y-row__date">{day.date}</span>
                </div>
                <div className="y-row__body">
                  <h3 className="y-row__title">{day.title}</h3>
                  <p className="y-row__summary">{day.summary}</p>
                </div>
                <ul className="y-row__schedule">
                  {day.schedule.map((slot) => (
                    <li key={slot.time}>
                      <b>{slot.time}</b>
                      <span>{slot.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COURSE ---------- */}
      <section className="y-block y-block--light y-course" id="course">
        <div className="y-course__map" data-aos="fade-up">
          <img
            src="/assets/yacht/course-map.svg"
            alt="제주 한림항에서 이호테우까지 이어지는 경기 코스 지도"
          />
        </div>
        <div className="y-course__text">
          <h2 className="y-display" data-aos="fade-up">
            <span className="y-eyebrow">Race Course</span>
            제주 해안선을 도는 코스
          </h2>
          <p className="y-body" data-aos="fade-up" data-aos-delay="120">
            한림항을 출발해 비양도와 애월 해안을 돌아 이호테우에서 결승하는 약 21.8km 코스.
          </p>
          <div className="y-course__stops" data-aos="fade-up" data-aos-delay="180">
            {courseStops.map((stop, index) => (
              <div className="y-stop" key={stop.name}>
                <span className="y-stop__no">{index + 1}</span>
                <span className="y-stop__info">
                  <span className="y-stop__name">{stop.name}</span>
                  <span className="y-stop__desc">{stop.description}</span>
                </span>
                <span className="y-stop__dist">{stop.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GALLERY (dark, campaign-style masonry) ---------- */}
      <section className="y-block y-block--dark y-gallery" id="gallery" data-nav-dark>
        <div className="y-block__inner">
          <h2 className="y-display y-display--section" data-aos="fade-up">
            <span className="y-eyebrow y-eyebrow--invert">Gallery</span>
            항해의 순간들
          </h2>
          <div className="y-masonry">
            {gallery.map((item, index) => (
              <article className="y-photo" key={item.id} data-aos="fade-up" data-aos-delay={(index % 2) * 80}>
                <div className="y-photo__img">
                  <img src={item.image} alt={item.title} />
                </div>
                <h3 className="y-photo__title">{item.title}</h3>
                <p className="y-photo__cap">{item.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TICKETS ---------- */}
      <section className="y-block y-block--light y-tickets" id="tickets">
        <div className="y-block__inner">
          <div className="y-block__head" data-aos="fade-up">
            <h2 className="y-display">
              <span className="y-eyebrow">Tickets</span>
              관람권 안내
            </h2>
            <p className="y-body">
              해안 관람부터 경기 해상에 직접 동행하는 VIP 승선권까지. 원하는 방식으로 그랑프리를 즐기세요.
            </p>
          </div>
          <div className="y-ticket-grid">
            {tickets.map((ticket, index) => (
              <div data-aos="fade-up" data-aos-delay={(index % 2) * 80} key={ticket.slug}>
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SPONSORS ---------- */}
      <section className="y-block y-block--light y-sponsors">
        <div className="y-block__inner">
          <p className="y-eyebrow y-eyebrow--center" data-aos="fade-up">
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
      <section className="y-block y-block--light y-faq-block" id="faq">
        <div className="y-block__inner y-block__inner--narrow">
          <h2 className="y-display" data-aos="fade-up">
            <span className="y-eyebrow">FAQ</span>
            자주 묻는 질문
          </h2>
          <div className="y-faq" data-aos="fade-up" data-aos-delay="80">
            {faqs.map((faq) => (
              <details className="y-faq__item" key={faq.question}>
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

      {/* ---------- CTA (dark) ---------- */}
      <section className="y-block y-block--dark y-cta" data-nav-dark>
        <div className="y-block__inner y-cta__inner" data-aos="fade-up">
          <h2 className="y-display y-display--section">제주 바다 위, 그 현장으로</h2>
          <p className="y-body y-body--invert">
            좌석은 한정되어 있습니다. 지금 관람권을 예매하고 잊지 못할 사흘을 함께하세요.
          </p>
          <Link href="/tickets" className="y-btn y-btn--invert">
            관람권 예매하기 <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
