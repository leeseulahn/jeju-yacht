import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./globals.css";
import "./styles/design-system.css";
import "./styles/yacht.css";
import { AosProvider } from "@/components/AosProvider";
import { eventInfo } from "@/lib/yacht/data";

export const metadata: Metadata = {
  title: {
    default: `${eventInfo.title} ${eventInfo.edition}`,
    template: `%s | ${eventInfo.title}`,
  },
  description: `${eventInfo.tagline}. ${eventInfo.dateLabel}, ${eventInfo.venue}. 관람권 온라인 예매.`,
  openGraph: {
    title: `${eventInfo.title} ${eventInfo.edition}`,
    description: eventInfo.tagline,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <div className="yacht">
          <AosProvider />
          {children}
        </div>
      </body>
    </html>
  );
}
