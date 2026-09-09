import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "수도권 힐링 여행지 안내 | 서울·경기·인천 추천 명소 - 무드앤휴",
  description: "피로를 비워내는 서울·경기·인천 드라이브와 산책 명소! 무드앤휴 힐링 가이드.",
  openGraph: {
    title: "수도권 힐링 여행지 안내 | 무드앤휴",
    description: "피로를 비워내는 서울·경기·인천 드라이브와 산책 명소! 무드앤휴 힐링 가이드.",
    url: "https://mood-hue.netlify.app/travel",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

const travelDestinations = [
  {
    region: "서울 코스",
    title: "남산 둘레길 & 한강 야경 드라이브",
    desc: "도심 속 탁 트인 파노라마 야경과 시원한 강바람을 맞으며 하루 동안 쌓인 일상의 복잡한 피로를 차분하게 비워내기 좋습니다.",
    tag: "#도심야경 #한강산책 #힐링드라이브",
  },
  {
    region: "경기 코스",
    title: "가평 잣향기푸른숲 & 북한강 뷰 로드",
    desc: "피톤치드 가득한 울창한 침엽수림 속에서 산림욕을 즐기고, 물안개 피어오르는 강변 길을 달리며 자연의 에너지를 충전할 수 있습니다.",
    tag: "#산림욕 #피톤치드 #자연휴식",
  },
  {
    region: "인천 코스",
    title: "영종도 마시안 해변 & 송도 센트럴파크",
    desc: "붉게 물드는 서해안 일몰을 바라보며 사색을 즐기고, 해질녘 수상 레저와 야경이 어우러진 해수공원에서 여유로운 산책을 즐겨보세요.",
    tag: "#서해일몰 #해변산책 #센트럴파크",
  },
  {
    region: "경기 남부",
    title: "화성 융건릉 숲길 & 제부도 바닷길",
    desc: "고즈넉한 솔숲길을 걸으며 복잡한 생각을 정리하고, 바닷길이 열리는 신비로운 드라이브 코스에서 재충전의 시간을 가질 수 있습니다.",
    tag: "#소나무숲길 #바닷길 #주말여행",
  },
];

export default function TravelPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 헤더 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            LOCAL TRAVEL GUIDE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            수도권 힐링 여행지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            피로를 씻어내기 좋은 서울·경기·인천의 자연 숲길과 드라이브 명소 가이드입니다.
          </p>
        </div>

        {/* 힐링 테마 소개 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-amber-300">🍃 지친 몸과 마음에 쉼표를 찍는 시간</h2>
            <p className="text-xs text-gray-400">
              가벼운 야외 산책과 드라이브로 기분 전환을 마치고, 프라이빗 홈케어로 피로를 깔끔하게 풀어보세요.
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-block bg-amber-500 text-black font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-amber-400 transition-colors shrink-0 ml-4"
          >
            홈으로 이동
          </Link>
        </div>

        {/* 여행지 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {travelDestinations.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-white/5 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 transition-all shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-amber-400 text-[11px] font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">
                  {item.region}
                </span>
                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-gray-400 font-medium">
                {item.tag}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/services"
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-3.5 rounded-2xl text-center shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>💆</span> 여행 후 릴렉스 케어 코스 보러가기
          </Link>
          <Link
            href="/"
            className="bg-[#18181c] hover:bg-[#202025] text-gray-300 hover:text-white font-bold text-xs py-3.5 px-6 rounded-2xl text-center border border-white/10 transition-colors flex items-center justify-center gap-1"
          >
            <span>🏠</span> 메인 홈으로
          </Link>
        </div>

      </div>
    </div>
  );
}