import Link from "next/link";
import { eventInfo } from "@/lib/yacht/data";

export function YachtFooter() {
  return (
    <footer className="y-footer">
      <div className="y-container">
        <div className="y-footer__grid">
          <div>
            <div className="y-logo" style={{ marginBottom: 16 }}>
              <span className="y-logo__mark">⛵</span>
              <span>
                JEJU SAILING
                <small>GRAND PRIX {eventInfo.edition}</small>
              </span>
            </div>
            <p>{eventInfo.tagline}</p>
            <p>{eventInfo.dateLabel}</p>
            <p>{eventInfo.venue}</p>
          </div>

          <div>
            <h4>바로가기</h4>
            <Link href="/#about">대회 소개</Link>
            <br />
            <Link href="/#program">경기 일정</Link>
            <br />
            <Link href="/#course">코스 안내</Link>
            <br />
            <Link href="/tickets">관람권 예매</Link>
          </div>

          <div>
            <h4>문의</h4>
            <p>주최 · {eventInfo.organizer}</p>
            <p>{eventInfo.contactEmail}</p>
            <p>{eventInfo.contactPhone}</p>
            <Link href="/admin/login">운영자 로그인</Link>
          </div>
        </div>

        <div className="y-footer__bottom">
          <span>© {eventInfo.edition} JEJU SAILING GRAND PRIX. All rights reserved.</span>
          <span>본 사이트는 데모용으로 제작되었으며 실제 결제는 이루어지지 않습니다.</span>
        </div>
      </div>
    </footer>
  );
}
