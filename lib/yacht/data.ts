// Demo data for the Jeju Sailing Grand Prix promotional + ticketing site.
// No database is required: everything here is static content, and live
// order state lives in lib/yacht/store.ts (in-memory). Swap these getters
// for real DB/API queries later without touching the UI.

export type TicketType = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  capacity: number;
  perks: string[];
  badge?: string;
  accent: "sea" | "gold" | "coral" | "deep";
};

export type ProgramDay = {
  day: string;
  date: string;
  title: string;
  summary: string;
  schedule: { time: string; label: string }[];
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Sponsor = {
  name: string;
  tier: "title" | "official" | "partner";
};

export type CourseStop = {
  name: string;
  description: string;
  distance: string;
};

export const eventInfo = {
  title: "제주 세일링 그랑프리",
  titleEn: "JEJU SAILING GRAND PRIX",
  edition: "2026",
  tagline: "제주 바다를 가르는 국제 요트 대회",
  intro:
    "푸른 제주 앞바다 위, 세계 16개국 48개 팀이 펼치는 사흘간의 항해. 바람과 파도, 그리고 사람이 만드는 가장 역동적인 해양 스포츠를 가장 가까운 자리에서 만나보세요.",
  startDate: "2026-09-18T09:00:00+09:00",
  endDate: "2026-09-20T18:00:00+09:00",
  dateLabel: "2026.09.18 FRI — 09.20 SUN",
  venue: "제주 한림항 & 이호테우 앞바다",
  venueShort: "제주 한림항",
  organizer: "제주특별자치도 · 대한요트협회",
  contactEmail: "hello@jejusailing.kr",
  contactPhone: "064-700-0000",
} as const;

export const stats = [
  { value: "16", unit: "개국", label: "참가 국가" },
  { value: "48", unit: "팀", label: "출전 요트" },
  { value: "3", unit: "일간", label: "대회 기간" },
  { value: "25K", unit: "+", label: "예상 관람객" },
] as const;

const ticketTypes: TicketType[] = [
  {
    slug: "day-pass",
    name: "일반 관람권",
    tagline: "Day Pass · 1일권",
    price: 30000,
    originalPrice: 38000,
    capacity: 4000,
    perks: ["해안 관람 구역 입장", "공식 프로그램북 제공", "푸드트럭 존 이용"],
    accent: "sea",
    badge: "BEST",
  },
  {
    slug: "premium-deck",
    name: "프리미엄 데크석",
    tagline: "Premium Deck · 1일권",
    price: 80000,
    capacity: 600,
    perks: ["해상 전망 데크 지정석", "웰컴 드링크 & 스낵", "공식 굿즈 키트", "전용 입장 게이트"],
    accent: "gold",
  },
  {
    slug: "vip-onboard",
    name: "VIP 요트 승선권",
    tagline: "VIP Onboard · 1일권",
    price: 250000,
    capacity: 80,
    perks: ["경기 해상 동행 승선", "전문 해설 라이브", "프리미엄 다이닝", "선수단 미팅 라운지"],
    accent: "deep",
    badge: "LIMITED",
  },
  {
    slug: "festival-pass",
    name: "페스티벌 3일권",
    tagline: "Festival Pass · 3일권",
    price: 70000,
    originalPrice: 90000,
    capacity: 1500,
    perks: ["3일 전일정 입장", "기념 메달 제공", "야간 하버 파티 입장", "굿즈 10% 할인"],
    accent: "coral",
  },
];

export const program: ProgramDay[] = [
  {
    day: "DAY 1",
    date: "09.18 FRI",
    title: "개막 & 플릿 레이스",
    summary: "선수단 입장식과 함께 시작되는 첫 항해. 한림항 앞바다에서 예선 플릿 레이스가 펼쳐집니다.",
    schedule: [
      { time: "10:00", label: "공식 개막식 · 선수단 퍼레이드" },
      { time: "13:00", label: "플릿 레이스 1·2 레그" },
      { time: "17:00", label: "오프닝 하버 콘서트" },
    ],
  },
  {
    day: "DAY 2",
    date: "09.19 SAT",
    title: "코스털 레이스",
    summary: "제주 해안선을 따라 도는 롱 코스 레이스. 가장 박진감 넘치는 추월과 전략이 펼쳐지는 날입니다.",
    schedule: [
      { time: "09:30", label: "코스털 레이스 출발" },
      { time: "14:00", label: "이호테우 통과 구간 라이브" },
      { time: "19:00", label: "선셋 하버 파티" },
    ],
  },
  {
    day: "DAY 3",
    date: "09.20 SUN",
    title: "결승 & 시상식",
    summary: "상위 12개 팀이 겨루는 메달 레이스. 우승팀을 가리는 마지막 항해와 시상식으로 마무리됩니다.",
    schedule: [
      { time: "11:00", label: "메달 레이스 결승" },
      { time: "15:30", label: "공식 시상식" },
      { time: "17:00", label: "클로징 세리머니 & 불꽃" },
    ],
  },
];

export const courseStops: CourseStop[] = [
  { name: "한림항 스타트라인", description: "대회 본부와 출발 게이트가 위치한 메인 하버", distance: "0 km" },
  { name: "비양도 마크", description: "첫 번째 반환점, 강한 측풍 구간으로 유명", distance: "6.4 km" },
  { name: "애월 코스털", description: "해안 절경을 따라 도는 롱 레그", distance: "14.2 km" },
  { name: "이호테우 피니시", description: "관람객이 가장 가까이서 보는 결승 구간", distance: "21.8 km" },
];

export const gallery: GalleryItem[] = [
  { id: "g1", title: "스피니커 런", caption: "순풍을 받아 펼쳐진 스피니커", image: "/assets/yacht/gallery-1.svg" },
  { id: "g2", title: "마크 라운딩", caption: "반환점을 도는 치열한 순간", image: "/assets/yacht/gallery-2.svg" },
  { id: "g3", title: "선셋 세일", caption: "노을과 함께한 코스털 레이스", image: "/assets/yacht/gallery-3.svg" },
  { id: "g4", title: "크루 워크", caption: "호흡을 맞추는 크루의 손길", image: "/assets/yacht/gallery-4.svg" },
  { id: "g5", title: "하버 나이트", caption: "대회의 밤을 밝히는 하버 파티", image: "/assets/yacht/gallery-5.svg" },
  { id: "g6", title: "피니시 라인", caption: "결승선을 통과하는 우승 요트", image: "/assets/yacht/gallery-6.svg" },
];

export const sponsors: Sponsor[] = [
  { name: "JEJU AIR", tier: "title" },
  { name: "HALLA MARINE", tier: "official" },
  { name: "OCEAN BLUE", tier: "official" },
  { name: "TAMNA BANK", tier: "partner" },
  { name: "SAMDA WATER", tier: "partner" },
  { name: "WINDLY", tier: "partner" },
];

export const faqs: FaqItem[] = [
  {
    question: "관람권은 현장에서도 구매할 수 있나요?",
    answer:
      "현장 부스에서도 일반 관람권을 구매할 수 있으나, 프리미엄 데크석과 VIP 승선권은 좌석이 한정되어 온라인 사전 예매만 가능합니다.",
  },
  {
    question: "우천 시 대회가 취소되나요?",
    answer:
      "요트 경기는 바람이 핵심이라 비가 와도 진행됩니다. 다만 태풍·강풍 등 안전상 위험이 있을 경우 일정이 순연되며, 순연 시 예매처를 통해 전액 환불 또는 일정 변경을 안내드립니다.",
  },
  {
    question: "VIP 승선권은 누구나 탑승할 수 있나요?",
    answer: "안전을 위해 만 14세 이상만 승선 가능하며, 승선 전 간단한 안전 교육이 진행됩니다. 구명조끼는 현장에서 제공됩니다.",
  },
  {
    question: "주차와 대중교통은 어떻게 되나요?",
    answer:
      "한림항 인근에 임시 주차장이 마련되며, 제주공항·제주시청에서 출발하는 셔틀버스가 30분 간격으로 운행됩니다. 가급적 셔틀 이용을 권장합니다.",
  },
];

export function getTicketTypes(): TicketType[] {
  return ticketTypes;
}

export function getTicketType(slug: string): TicketType | undefined {
  return ticketTypes.find((ticket) => ticket.slug === slug);
}
