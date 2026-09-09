import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "실제 이용 고객 생생후기 | 100% 후불제 안심 리뷰 - 무드앤휴",
  description: "서울·경기·인천 실제 이용 고객 만족 후기! 선입금 없는 100% 안심 테라피 리뷰.",
  openGraph: {
    title: "실제 이용 고객 생생후기 | 무드앤휴",
    description: "서울·경기·인천 실제 이용 고객 만족 후기! 선입금 없는 100% 안심 테라피 리뷰.",
    url: "https://mood-hue.netlify.app/reviews",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ReviewsPage() {
  const reviews = [
    {
      name: "서울 강남구 이용자",
      service: "한국인 베테랑 VIP 코스",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "야근 후에 방문 홈케어 신청했는데 25분 만에 오셨어요. 뭉친 승모근과 어깨가 싹 풀렸네요!",
    },
    {
      name: "경기 수원시 이용자",
      service: "감성 스웨디시 (60분)",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "선입금 없는 후불제라 마음 편하게 이용했습니다. 관리사분 마인드와 실력도 완전 만족스럽습니다.",
    },
    {
      name: "인천 연수구(송도) 이용자",
      service: "아로마 오일 케어 (60분)",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "스웨디시와 아로마를 함께 받았는데 피로가 정말 싹 가셨습니다. 주말마다 정기적으로 부를 것 같아요.",
    },
    {
      name: "서울 마포구 이용자",
      service: "타이 건식 케어 (60분)",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "시간 약속 칼같이 지켜주시고 위생 관리가 철저해서 만족스러웠습니다. 가성비 최고의 힐링이네요.",
    },
    {
      name: "경기 성남(분당) 이용자",
      service: "한국인 베테랑 VIP 코스",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "개인 공간에서 편안하게 받으니 이동 시간도 아끼고 훨씬 개운합니다. 부모님께도 예약해드렸어요.",
    },
    {
      name: "인천 계양구 이용자",
      service: "감성 스웨디시 (60분)",
      rate: "★★★★★ 5.0",
      date: "최근 이용",
      text: "도착 후 결제하는 시스템이라 믿고 부를 수 있었습니다. 힐러분 손길이 정말 꼼꼼하고 친절하셨어요.",
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            실제 이용 고객 생생 후기
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            수도권 전지역 100% 후불제로 안전하게 이용하신 고객님들의 솔직한 이용 경험입니다
          </p>
        </div>

        {/* 평점 통계 카드 */}
        <div className="bg-gradient-to-r from-amber-500/15 via-[#141418] to-amber-500/10 border border-amber-500/30 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-amber-400">4.98</div>
            <div>
              <div className="text-amber-400 text-xs tracking-wider">★★★★★</div>
              <p className="text-[11px] text-gray-300 mt-0.5">수도권 누적 만족도 평가 기준</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-300 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-5">
            <div>
              <span className="text-gray-400 block text-[10px]">시간 준수율</span>
              <strong className="text-white font-bold">99.4%</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">후불제 안심 만족도</span>
              <strong className="text-amber-400 font-bold">100%</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">재이용 의사</span>
              <strong className="text-white font-bold">98.7%</strong>
            </div>
          </div>
        </div>

        {/* 리뷰 카드 그리드 */}
        <div className="space-y-3.5">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-5 rounded-2xl space-y-2.5 transition-all shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-black text-xs tracking-wider">{rev.rate}</span>
                  <span className="text-[10px] text-gray-400 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">
                    {rev.service}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">{rev.name}</span>
              </div>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                &quot;{rev.text}&quot;
              </p>
              <div className="text-[10px] text-gray-400 text-right">
                {rev.date}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 안심 수칙 안내 */}
        <div className="bg-[#0e0e11] border border-white/5 p-4 rounded-2xl text-center text-xs text-gray-400 leading-relaxed">
          무드앤휴는 고객님의 안전한 이용을 위해 <strong>도착 전 선입금을 요구하지 않는 제휴점</strong>만 엄선하여 안내합니다.
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="tel:0507-1280-3344"
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-3.5 rounded-2xl text-center shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>📞</span> 제휴 문의 및 예약 안내 (0507-1280-3344)
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