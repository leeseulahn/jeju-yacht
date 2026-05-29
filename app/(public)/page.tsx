import Link from "next/link";
import { Countdown } from "@/components/yacht/Countdown";
import { CoverScene } from "@/components/yacht/CoverScene";
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
} from "@/lib/yacht/data";

const HIGHLIGHTS = [
  { icon: Sail, title: "세계 정상급 레이스", text: "16개국 48팀이 겨루는 국제 세일링 그랑프리 시리즈" },
  { icon: Pin, title: "가장 가까운 관람", text: "이호테우 피니시 라인에서 펼쳐지는 박진감 넘치는 결승 구간" },
  { icon: Users, title: "온 가족 페스티벌", text: "하버 콘서트, 푸드트럭 존, 요트 체험까지 즐기는 사흘" },
];

export default function YachtLandingPage() {
  const tickets = getTicketTypes();
  const leftGallery = gallery.filter((_, i) => i % 2 === 0);
  const rightGallery = gallery.filter((_, i) => i % 2 === 1);

  return (
    <div className="y-home">
      {/* ============================ COVER ============================ */}
      <CoverScene />

      {/* ============================ DETAILS ============================ */}
      <section className="y-block y-block--light y-details" id="details">
        <div className="y-block__inner y-details__inner">
          <div className="y-details__meta">
            <p className="y-eyebrow" data-aos="fade-up">
              {eventInfo.edition} Edition
            </p>
            <h2 className="y-display" data-aos="fade-up" data-aos-delay="80">
              {eventInfo.tagline}
            </h2>
            <ul className="y-details__list" data-aos="fade-up" data-aos-delay="160">
              <li>
                <Calendar size={18} />
                <span>{eventInfo.dateLabel}</span>
              </li>
              <li>
                <Pin size={18} />
                <span>{eventInfo.venue}</span>
              </li>
            </ul>
            <div className="y-details__cta" data-aos="fade-up" data-aos-delay="240">
              <Link href="/tickets" className="y-btn y-btn--primary">
                관람권 예매 <ArrowRight size={18} />
              </Link>
              <Link href="#about" className="y-btn y-btn--outline">
                대회 둘러보기
              </Link>
            </div>
          </div>
          <div className="y-details__count" data-aos="fade-up" data-aos-delay="120">
            <span className="y-eyebrow">Countdown</span>
            <Countdown target={eventInfo.startDate} />
          </div>
        </div>
      </section>

      {/* ============================ ABOUT / WHY ============================ */}
      <section className="y-block y-block--light y-why" id="about">
        <div className="y-why__inner">
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
              data-aos-delay="140"
            />
            <img
              src="/assets/yacht/gallery-1.svg"
              alt="스피니커를 펼친 요트"
              data-aos="fade-up"
              data-aos-delay="260"
            />
          </div>
          <div className="y-why__text">
            <h2 className="y-display y-display--center" data-aos="fade-up">
              바람을 읽는 사람들의
              <br />가장 푸른 무대
            </h2>
            <p className="y-body y-body--center" data-aos="fade-up" data-aos-delay="120">
              {eventInfo.intro}
            </p>
            <ul className="y-why__points" data-aos="fade-up" data-aos-delay="180">
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
        </div>
      </section>

      {/* ============================ PROGRAM / SOLUTIONS (dark) ============================ */}
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

      {/* ============================ COURSE ============================ */}
      <section className="y-block y-block--light y-course" id="course">
        <div className="y-course__inner">
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
        </div>
      </section>

      {/* ============================ GALLERY / CAMPAIGNS (2-col offset) ============================ */}
      <section className="y-block y-block--light y-gallery" id="gallery">
        <div className="y-block__inner">
          <h2 className="y-display y-display--section" data-aos="fade-up">
            <span className="y-eyebrow">Gallery</span>
            항해의 순간들
          </h2>
          <div className="y-campaign-grid">
            <div className="y-campaign-col">
              {leftGallery.map((item, idx) => (
                <article className="y-campaign-card" key={item.id} data-aos="fade-up" data-aos-delay={idx * 80}>
                  <div className="y-campaign-card__img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="y-campaign-card__body">
                    <h3>{item.title}</h3>
                    <div className="y-campaign-card__tags">
                      <span>제주</span>
                      <span>레이스</span>
                    </div>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="y-campaign-col">
              {rightGallery.map((item, idx) => (
                <article className="y-campaign-card" key={item.id} data-aos="fade-up" data-aos-delay={idx * 80 + 40}>
                  <div className="y-campaign-card__img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="y-campaign-card__body">
                    <h3>{item.title}</h3>
                    <div className="y-campaign-card__tags">
                      <span>해양</span>
                      <span>크루</span>
                    </div>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TICKETS / NEWSROOM (dark) ============================ */}
      <section className="y-block y-block--dark y-tickets" id="tickets" data-nav-dark>
        <div className="y-block__inner">
          <h2 className="y-display y-display--section" data-aos="fade-up">
            <span className="y-eyebrow y-eyebrow--invert">Tickets</span>
            관람권 안내
          </h2>
          <div className="y-ticket-grid">
            {tickets.map((ticket, index) => (
              <div data-aos="fade-up" data-aos-delay={(index % 4) * 80} key={ticket.slug}>
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
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

      {/* ============================ CTA (dark) ============================ */}
      <section className="y-block y-block--dark y-cta" data-nav-dark>
        <div className="y-block__inner y-cta__inner" data-aos="fade-up">
          <h2 className="y-display y-display--section">제주 바다 위, 그 현장으로</h2>
          <p className="y-body y-body--invert y-body--center">
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
