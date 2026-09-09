import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "코스별 서비스 안내 | 타이·아로마·스웨디시 힐링 케어 - 무드앤휴",
  description: "타이, 아로마, 스웨디시 맞춤 힐링 프로그램 안내! 선입금 없는 100% 후불 안심 케어.",
  openGraph: {
    title: "코스별 서비스 안내 | 무드앤휴",
    description: "타이, 아로마, 스웨디시 맞춤 힐링 프로그램 안내! 선입금 없는 100% 후불 안심 케어.",
    url: "https://mood-hue.netlify.app/services",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ServicesPage() {
  const services = [
    {
      step: "01",
      title: "건식 / 타이 테라피",
      sub: "정통 스트레칭 & 근육 이완",
      desc: "전신의 뭉친 근육과 스트레스받은 관절을 정성스럽게 풀어주는 스트레칭 중심의 전통 케어 코스입니다. 만성 근육 뭉침과 피로 완화에 탁월합니다.",
      features: ["전신 스트레칭", "목·어깨 집중 케어", "활력 충전"],
    },
    {
      step: "02",
      title: "아로마 오일 케어",
      sub: "천연 오일 & 부드러운 릴렉싱",
      desc: "최고급 천연 아로마 오일을 사용하여 피부 자극 없이 부드럽게 혈액순환과 피로 해소를 돕는 릴렉싱 코스입니다. 지친 심신에 깊은 휴식을 선물합니다.",
      features: ["천연 아로마 오일", "심신 안정", "피부 보습 효과"],
    },
    {
      step: "03",
      title: "VIP 감성 스웨디시",
      sub: "림프 순환 & 프라이빗 힐링",
      desc: "섬세하고 부드러운 압으로 림프 순환을 촉진하고 지친 몸과 마음을 최상의 상태로 리프레시해 드리는 무드앤휴만의 프리미엄 시그니처 케어입니다.",
      features: ["부드러운 압", "림프 순환 촉진", "최상의 피로 해소"],
    },
    {
      step: "04",
      title: "한국인 베테랑 VIP 코스",
      sub: "1:1 맞춤형 체형 케어",
      desc: "풍부한 현장 경험을 갖춘 베테랑 힐러가 고객의 당일 컨디션과 불편 부위를 정밀하게 진단하여 진행하는 최고 등급의 프라이빗 피로회복 프로그램입니다.",
      features: ["맞춤 강도 조율", "체형 밸런스 케어", "프리미엄 관리"],
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            PREMIUM CARE SERVICE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            무드앤휴 코스별 서비스 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            고객님의 당일 컨디션과 라이프스타일에 맞춘 수도권 24시 프라이빗 힐링 프로그램 가이드입니다.
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-6 rounded-3xl space-y-4 transition-all shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-2xl font-black">{item.step}</span>
                  <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {item.sub}
                  </span>
                </div>
                <h2 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {item.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[10px] text-gray-400 bg-black/40 px-2 py-0.5 rounded-md border border-white/5"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 이용 프로세스 요약 */}
        <div className="bg-[#0e0e11] border border-white/5 p-6 rounded-3xl space-y-3 text-xs text-gray-300 leading-relaxed">
          <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
            <span>🛡️</span> 무드앤휴 서비스 이용 원칙
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-gray-400">
            <li>모든 방문 케어는 <strong>도착 전 선입금을 절대 요구하지 않는 100% 후불제</strong>로 진행됩니다.</li>
            <li>서울, 경기, 인천 주요 거점 기준 문의 후 평균 25분 내외로 원활하게 배차 및 방문이 이루어집니다.</li>
            <li>원하시는 관리 강도나 집중 관리 부위가 있으실 경우 예약 상담 시 편하게 말씀해 주세요.</li>
          </ul>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="tel:0507-1280-3344"
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-3.5 rounded-2xl text-center shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>📞</span> 24시 실시간 서비스 문의 (0507-1280-3344)
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