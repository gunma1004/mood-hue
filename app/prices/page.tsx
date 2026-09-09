import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "투명한 코스별 가격안내 | 100% 후불제 안심 예약 - 무드앤휴",
  description: "타이·아로마·스웨디시 투명한 가격 안내! 선입금 없는 100% 후불제 안심 힐링.",
  openGraph: {
    title: "투명한 코스별 가격안내 | 무드앤휴",
    description: "타이·아로마·스웨디시 투명한 가격 안내! 선입금 없는 100% 후불제 안심 힐링.",
    url: "https://mood-hue.netlify.app/prices",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

export default function PricesPage() {
  const priceList = [
    {
      title: "타이 건식 케어 (60분)",
      price: "60,000원부터",
      desc: "전신 피로 해소 기본 스트레칭 및 굳은 근육 이완 집중 프로그램",
      tag: "베이직",
    },
    {
      title: "아로마 오일 케어 (60분)",
      price: "70,000원부터",
      desc: "천연 아로마 오일을 활용한 부드러운 전신 릴렉싱 & 피부 보습 케어",
      tag: "인기",
    },
    {
      title: "감성 스웨디시 (60분)",
      price: "90,000원부터",
      desc: "림프 순환과 심신 안정을 돕는 감각적인 VIP 프리미엄 케어 코스",
      tag: "추천",
    },
    {
      title: "한국인 베테랑 VIP 코스 (60분)",
      price: "140,000원부터",
      desc: "체형 맞춤형 피로회복 특화 시그니처 1:1 맞춤 힐링 프로그램",
      tag: "VIP 시그니처",
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            TRANSPARENT PRICE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            투명한 코스별 가격 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            선입금 없는 100% 안심 후불제 / 도착 전 예약금 요구는 절대 없습니다
          </p>
        </div>

        {/* 100% 후불제 안심 공지 배너 */}
        <div className="bg-gradient-to-r from-amber-500/15 via-[#16161a] to-amber-500/10 border border-amber-500/30 p-5 rounded-3xl shadow-lg space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-base">🛡️</span>
            <h2 className="text-sm font-bold text-amber-300">선입금 없는 100% 안심 이용 수칙</h2>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            무드앤휴의 모든 제휴점은 테라피스트가 고객님의 위치에 도착한 후 직접 확인하고 결제하는 <strong>전면 후불제</strong>를 준수합니다. 출발 전 어떠한 명목의 예약금도 요구하지 않습니다.
          </p>
        </div>

        {/* 가격 리스트 */}
        <div className="space-y-4">
          {priceList.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-5 md:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-md group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                <span className="text-amber-400 font-black text-base md:text-lg bg-amber-500/10 px-4 py-1.5 rounded-xl border border-amber-500/30 shadow-inner">
                  {item.price}
                </span>
                <span className="text-[10px] text-gray-500 mt-1 hidden sm:block">
                  VAT 포함 기준
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 안내사항 리스트 */}
        <div className="bg-[#0e0e11] border border-white/5 p-5 rounded-2xl space-y-2 text-xs text-gray-400 leading-relaxed">
          <h4 className="font-bold text-gray-200">📌 이용 안내 및 유의사항</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>모든 코스는 고객님의 컨디션과 선호 압에 맞춰 1:1 조율이 가능합니다.</li>
            <li>기재된 요금은 기본 기준 요금이며, 시간 연장 및 코스 추가는 예약 시 문의 부탁드립니다.</li>
            <li>수도권(서울·경기·인천) 주요 거점 기준 평균 25분 내외 신속 방문을 원칙으로 합니다.</li>
          </ul>
        </div>

        {/* 하단 빠른 문의 / 홈 이동 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="tel:0507-1280-3344"
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-3.5 rounded-2xl text-center shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>📞</span> 24시 실시간 요금 상담 (0507-1280-3344)
          </a>
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