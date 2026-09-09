import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "맛집·숙소 가이드 | 수도권 주요 거점 힐링 플레이스 - 무드앤휴",
  description: "서울·경기·인천 검증된 맛집과 편안한 휴식 숙소 가이드! 무드앤휴 제휴 플레이스 안내.",
  openGraph: {
    title: "맛집·숙소 가이드 | 무드앤휴 힐링 플레이스",
    description: "서울·경기·인천 검증된 맛집과 편안한 휴식 숙소 가이드! 무드앤휴 제휴 플레이스 안내.",
    url: "https://mood-hue.netlify.app/places",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

interface PlaceItem {
  id: number;
  category: "맛집" | "숙소";
  region: string;
  name: string;
  desc: string;
  tag: string;
}

const placesData: PlaceItem[] = [
  {
    id: 1,
    category: "숙소",
    region: "서울 강남",
    name: "프라이빗 어반 스테이",
    desc: "도심 속 조용한 힐링을 선사하는 고급 부티크 객실 및 맞춤 릴렉싱 라운지 운영.",
    tag: "#호캉스 #프라이빗휴식 #조용한공간",
  },
  {
    id: 2,
    category: "맛집",
    region: "경기 수원",
    name: "정원 담은 보양식당",
    desc: "지친 피로를 풀어주는 건강 약선 요리와 자연 담은 한상차림 전문 명소.",
    tag: "#원기회복 #자연식단 #가족모임",
  },
  {
    id: 3,
    category: "숙소",
    region: "인천 송도",
    name: "오션뷰 릴렉스 레지던스",
    desc: "탁 트인 바다 전망과 함께 지친 심신을 차분하게 재충전할 수 있는 프리미엄 공간.",
    tag: "#오션뷰 #야경명소 #완벽한휴식",
  },
  {
    id: 4,
    category: "맛집",
    region: "서울 마포",
    name: "슬로우 다이닝 & 티하우스",
    desc: "향긋한 유기농 허브 티와 정갈한 식사로 몸속 순환을 돕는 웰니스 힐링 카페.",
    tag: "#웰니스푸드 #허브티 #분위기맛집",
  },
  {
    id: 5,
    category: "숙소",
    region: "경기 성남(분당)",
    name: "포레스트 가든 스테이",
    desc: "녹음이 어우러진 프라이빗 가든 뷰에서 누리는 최상의 안락함과 숙면 케어 환경.",
    tag: "#숲속힐링 #조용한스테이 #힐링케어",
  },
  {
    id: 6,
    category: "맛집",
    region: "인천 영종",
    name: "해변가 힐링 시푸드",
    desc: "신선한 제철 해산물로 피로를 회복하고 바다의 신선함을 가득 담아내는 대표 식당.",
    tag: "#제철보양 #영종도맛집 #바다전망",
  },
];

export default function PlacesPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 헤더 섹션 */}
        <div className="text-center space-y-3">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            RECOMMENDED PLACES
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            내 주변 맛집 & 편안한 휴식 공간
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            서울, 경기, 인천 주요 거점의 엄선된 미식 스팟과 완벽한 휴식을 돕는 프라이빗 공간 가이드입니다.
          </p>
        </div>

        {/* 안내 배너 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-300">🌿 무드앤휴 웰니스 플레이스 안내</h3>
            <p className="text-xs text-gray-400">
              신체 밸런스를 되찾아주는 건강한 맛집과 조용한 스테이 정보를 주기적으로 엄선하여 갱신합니다.
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-block bg-amber-500 text-black font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-amber-400 transition-colors shrink-0 ml-4"
          >
            홈으로 이동
          </Link>
        </div>

        {/* 맛집 및 숙소 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placesData.map((place) => (
            <div
              key={place.id}
              className="bg-[#121214] border border-white/5 hover:border-amber-500/40 p-5 rounded-2xl space-y-3 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-black px-2.5 py-1 rounded-lg ${
                    place.category === "숙소"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {place.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{place.region}</span>
              </div>

              <div>
                <h2 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {place.name}
                </h2>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  {place.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 font-medium">
                {place.tag}
              </div>
            </div>
          ))}
        </div>

        {/* 홈 이동 및 바로가기 CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:from-amber-400 hover:to-yellow-300 transition-all transform active:scale-95"
          >
            <span>✨</span> 무드앤휴 홈케어 서비스 확인하기
          </Link>
        </div>

      </div>
    </div>
  );
}