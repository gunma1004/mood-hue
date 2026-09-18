import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "@/app/[region]/[district]/ClientTextMixer";
import ClientShopList from "@/app/[region]/[district]/ClientShopList";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (locationKeyword + dongName + districtName)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  // 🌟 타이틀: "출장" 단어 완전 배제, 깔끔한 마사지/홈케어 중심 30가지 조합
  const cleanTitles = [
    /* 0 */ `${locationKeyword} 타이 마사지 추천 | 24시 방문 힐링 케어 - 무드앤휴`,
    /* 1 */ `[무드앤휴] ${locationKeyword} 아로마 마사지 안내 · 후불 안심제`,
    /* 2 */ `${simpleLocation} 스웨디시 마사지 안내 | ${regionName} 프라이빗 힐링`,
    /* 3 */ `${locationKeyword} 힐링 마사지 제휴업체 정보 및 예약 가이드`,
    /* 4 */ `${simpleLocation} 홈케어 마사지 빠른 방문 24시 | 전문 힐러 케어`,
    /* 5 */ `무드앤휴 | ${locationKeyword} 바디 마사지 안심 후불제 테라피`,
    /* 6 */ `${locationKeyword} 오일 마사지 신속 도착 · 선입금 없는 바디케어`,
    /* 7 */ `${regionName} ${simpleLocation} 건식 마사지 24시 예약 및 코스 안내`,
    /* 8 */ `${locationKeyword} 림프 마사지 | 프라이빗 1:1 맞춤형 피로회복`,
    /* 9 */ `[24시 방문] ${simpleLocation} 릴렉싱 마사지 추천 매장 - 무드앤휴`,
    /* 10 */ `${locationKeyword} 방문 마사지 릴렉싱 케어 | 후불제 홈테라피`,
    /* 11 */ `${locationKeyword} 1대1 마사지 25분 내 빠르게 달려갑니다`,
    /* 12 */ `프라이빗 케어 ${simpleLocation} 맞춤 마사지 | 타이·아로마 전문`,
    /* 13 */ `${locationKeyword} 프라이빗 마사지 24시 엄선 제휴 및 요금 안내`,
    /* 14 */ `${simpleLocation} 힐러 마사지 잘하는 곳 | 100% 후불 안심 테라피`,
    /* 15 */ `${locationKeyword} 24시 마사지 신속한 예약 서비스 | 무드앤휴 공식`,
    /* 16 */ `[무드앤휴 24시] ${locationKeyword} 야간 마사지 베테랑 힐러 케어`,
    /* 17 */ `${simpleLocation} 빠른 마사지 가이드 | 스웨디시·아로마 전문`,
    /* 18 */ `${locationKeyword} 신속 마사지 24시간 언제나 빠르게 출동합니다`,
    /* 19 */ `${simpleLocation} 즉시 마사지 선입금 X | 안심 후불 바디케어`,
    /* 20 */ `${regionName} ${locationKeyword} 후불제 마사지 릴렉스 제휴 가이드`,
    /* 21 */ `${locationKeyword} 안심 마사지 만족도 높고 신속한 24시 테라피`,
    /* 22 */ `[공식] ${simpleLocation} 정직한 마사지 제휴업체 코스 및 요금`,
    /* 23 */ `${locationKeyword} 보장 마사지 25분 내 빠르게 만나는 힐링 타임`,
    /* 24 */ `${simpleLocation} 예약 마사지 프라이빗 케어 | 100% 후불제`,
    /* 25 */ `무드앤휴 추천 ${locationKeyword} 피로회복 마사지 24시 서비스`,
    /* 26 */ `${locationKeyword} 프리미엄 마사지 타이 & 아로마 전문 힐링`,
    /* 27 */ `${simpleLocation} VIP 마사지 예약 가이드 · 정직한 힐링 테라피`,
    /* 28 */ `${locationKeyword} 힐링케어 마사지 친절 방문 | 전신 피로 완화`,
    /* 29 */ `[24시 신속] ${locationKeyword} 전신 마사지 힐링 테라피 정보 안내`,
  ];

  // 🌟 메타 디스크립션: "출장"과 "마사지"가 자연스럽게 떨어져서 배치됨 (예: "출장 타이 마사지")
  const spacedDescriptions = [
    /* 0 */ `${locationKeyword} 출장 타이 마사지 25분 내 빠른 방문! 선입금 없는 100% 안심 후불제 힐링 안내.`,
    /* 1 */ `프라이빗 피로회복! ${locationKeyword} 출장 아로마 마사지 가이드. 베테랑 힐러의 맞춤 테라피.`,
    /* 2 */ `${locationKeyword} 출장 스웨디시 마사지 신속 예약. 부담 없는 후불제와 정직한 코스 안내, 무드앤휴.`,
    /* 3 */ `${simpleLocation} 출장 힐링 마사지 24시 안내. 스웨디시, 아로마 릴렉싱 정보 및 빠른 전화 연결.`,
    /* 4 */ `${locationKeyword} 출장 홈케어 마사지! 100% 후불제로 안심하고 즐기는 프라이빗 테라피 가이드입니다.`,
    /* 5 */ `일상의 피로를 풀어줄 ${locationKeyword} 출장 바디 마사지. 빠른 방문과 베테랑 관리사의 품격 케어.`,
    /* 6 */ `${locationKeyword} 25분 내 도착! 선입금 없는 안심 후불제 출장 오일 마사지 추천 코스 안내.`,
    /* 7 */ `${simpleLocation} 출장 건식 마사지 전문 제휴업체 모음. 24시간 개인 공간에서 누리는 전신 케어.`,
    /* 8 */ `${locationKeyword} 믿을 수 있는 후불제 출장 림프 마사지 정보. 타이, 아로마 코스를 비교하세요.`,
    /* 9 */ `무드앤휴 보장 ${locationKeyword} 출장 릴렉싱 마사지! 선입금 요구 없는 100% 안전 시스템.`,
    /* 10 */ `${locationKeyword} 24시 출장 방문 마사지 종합 안내. 맞춤형 힐링 케어로 묵은 피로를 해소해 드립니다.`,
    /* 11 */ `${simpleLocation} 출장 1대1 마사지 코스 및 가격 안내. 24시간 친절 상담과 빠른 방문 지원.`,
    /* 12 */ `${locationKeyword} 출장 맞춤 마사지 프로그램. 프라이빗한 케어로 편안함과 활력을 찾아드립니다.`,
    /* 13 */ `${locationKeyword} 24시 출장 프라이빗 마사지 예약. 선입금 없는 100% 후불제 제휴 정보 선별 전달.`,
    /* 14 */ `${simpleLocation} 신속 방문 출장 힐러 마사지. 타이, 아로마, 스웨디시 딱 맞는 힐링 테라피 추천.`,
    /* 15 */ `${locationKeyword} 출장 24시 마사지 안심 예약! 예약금 없는 정직한 100% 후불 시스템 운영.`,
    /* 16 */ `전문 힐러의 손길로 만나는 ${locationKeyword} 출장 야간 마사지. 빠른 방문과 합리적 코스 확인.`,
    /* 17 */ `${simpleLocation} 출장 빠른 마사지 방문 서비스. 쌓인 스트레스와 뭉친 근육을 부드럽게 이완.`,
    /* 18 */ `${locationKeyword} 출장 신속 마사지 엄선 제휴 안내. 선입금 없는 검증된 1:1 맞춤 케어 제공.`,
    /* 19 */ `${locationKeyword} 25분 내 출동하는 출장 즉시 마사지! 친절한 상담과 신속한 도착으로 편안한 이용.`,
    /* 20 */ `${simpleLocation} 만족도 1위 출장 후불제 마사지 가이드. 전신 아로마, 스웨디시 코스로 힐링.`,
    /* 21 */ `${locationKeyword} 출장 안심 마사지 24시 상시 운영! 100% 후불 안심 예약으로 부담 없이 이용.`,
    /* 22 */ `무드앤휴 공식 ${locationKeyword} 출장 정직한 마사지 안내. 차별화된 프리미엄 홈케어를 만나보세요.`,
    /* 23 */ `${simpleLocation} 전문 출장 보장 마사지 가이드. 1:1 맞춤 피로회복 케어로 쾌적한 힐링 선물.`,
    /* 24 */ `${locationKeyword} 출장 예약 마사지 신속 방문! 선입금 없는 후불제로 즐기는 럭셔리 케어.`,
    /* 25 */ `지친 몸에 활력을 줄 ${locationKeyword} 출장 피로회복 마사지. 검증된 관리사의 힐링 코스 추천.`,
    /* 26 */ `${simpleLocation} 출장 프리미엄 마사지 상세 안내. 24시간 원하는 시간에 맞춘 프라이빗 케어.`,
    /* 27 */ `${locationKeyword} 출장 VIP 마사지 안심 후불제 추천! 출발 전 예약금을 요구하지 않는 안전 매장.`,
    /* 28 */ `${locationKeyword} 25분 신속 방문 출장 힐링케어 마사지. 뭉친 승모근과 하체 피로를 상쾌하게 이완.`,
    /* 29 */ `${simpleLocation} 최상의 24시 출장 전신 마사지 제휴 안내. 정직한 서비스와 투명한 요금 확인.`,
  ];

  const title = cleanTitles[variantIndex];
  const description = spacedDescriptions[variantIndex];

  return {
    title,
    description,
    keywords: [
      `${locationKeyword} 타이 마사지`,
      `${locationKeyword} 아로마 마사지`,
      `${locationKeyword} 스웨디시 마사지`,
      `${locationKeyword} 힐링 마사지`,
      `${simpleLocation} 홈케어 마사지`,
      `${locationKeyword} 바디 마사지`,
      `${locationKeyword} 오일 마사지`,
      `${locationKeyword} 건식 마사지`,
      `${locationKeyword} 림프 마사지`,
      `${simpleLocation} 릴렉싱 마사지`,
      `${locationKeyword} 방문 마사지`,
      `${locationKeyword} 1대1 마사지`,
      `${locationKeyword} 맞춤 마사지`,
      `${locationKeyword} 프라이빗 마사지`,
      `${simpleLocation} 힐러 마사지`,
      `${locationKeyword} 24시 마사지`,
      `${locationKeyword} 야간 마사지`,
      `${locationKeyword} 빠른 마사지`,
      `${locationKeyword} 신속 마사지`,
      `${simpleLocation} 즉시 마사지`,
      `${locationKeyword} 후불제 마사지`,
      `${locationKeyword} 안심 마사지`,
      `${locationKeyword} 정직한 마사지`,
      `${locationKeyword} 보장 마사지`,
      `${simpleLocation} 예약 마사지`,
      `${locationKeyword} 피로회복 마사지`,
      `${locationKeyword} 프리미엄 마사지`,
      `${locationKeyword} VIP 마사지`,
      `${simpleLocation} 힐링케어 마사지`,
      `${locationKeyword} 전신 마사지`,
    ],
    openGraph: {
      title,
      description,
      url: `https://mood-hue.netlify.app/massage/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "무드앤휴",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function SpacedMassagePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";

  const fullTitle = dongName ? `${regionName} ${districtName} (${dongName})` : `${regionName} ${districtName}`;

  const localShops = [
    {
      id: 1,
      name: `🔥 ${fullTitle} 한국미인홈케어`,
      desc: "지친 일상에 맞춤형 피로회복 케어! 베테랑 테라피스트의 정성 어린 프라이빗 릴렉싱",
      phone: "0507-1280-3303",
      price: "100,000원부터~",
      image: "/shop1.jpg",
    },
    {
      id: 2,
      name: `✨ ${fullTitle} 오늘밤테라피`,
      desc: "최고급 천연 아로마 오일을 활용한 품격 있는 전신 바디 이완 케어 서비스",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/shop2.jpg",
    },
    {
      id: 3,
      name: `💎 ${fullTitle} 주주테라피`,
      desc: "재방문율 높은 안심 케어! 철저한 위생 관리와 럭셔리 스웨디시 프로그램 제공",
      phone: "0507-1280-3193",
      price: "60,000원부터~",
      image: "/shop3.jpg",
    },
    {
      id: 4,
      name: `🌟 ${fullTitle} 퀸즈홈테라피`,
      desc: "전문 힐러진의 맞춤형 VIP 체형 맞춤 피로회복 특화 프로그램 운영 중",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/shop4.jpg",
    },
    {
      id: 5,
      name: `👑 ${fullTitle} 골든테라피`,
      desc: "선입금 전혀 없는 100% 안심 후불제! 수도권 신속 방문 프라이빗 서비스",
      phone: "0507-1280-3360",
      price: "110,000원부터~",
      image: "/shop5.jpg",
    },
  ];

  const charSum = (fullTitle + districtName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const ratingValue = (4.9 + (charSum % 2) * 0.1).toFixed(1);
  const reviewCount = String(115 + (charSum % 32));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${fullTitle} 방문 마사지 & 힐링 테라피 - 무드앤휴`,
    "description": `${fullTitle} 24시 출장 타이, 아로마, 스웨디시 마사지 제휴업체 정보 안내`,
    "url": `https://mood-hue.netlify.app/massage/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
    "telephone": "0507-1280-3344",
    "priceRange": "60,000원 ~ 190,000원",
    "image": "https://mood-hue.netlify.app/banner.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": regionName,
      "addressCountry": "KR",
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": regionName,
      },
      {
        "@type": "AdministrativeArea",
        "name": districtName,
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="무드앤휴 로고"
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                무드앤휴
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">SEOUL · GYEONGGI · INCHEON</span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all shadow-inner"
          >
            🏠 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 p-6 md:p-8 bg-gradient-to-b from-[#16161a] to-[#0a0a0c]">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            {regionName.toUpperCase()} · 24H PRIVATE THERAPY
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white mt-1">
            {fullTitle} 타이 & 아로마 마사지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            {fullTitle} 인근 어디서나 25분 내 신속 방문! 선입금 요구 없는 100% 안심 후불제 출장 스웨디시 및 힐링 마사지 정보입니다.
          </p>
        </section>

        <ClientTextMixer locationText={fullTitle} />

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RECOMMENDED MASSAGE SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {fullTitle} 추천 테라피 제휴 (5곳)
            </h2>
          </div>

          <ClientShopList initialShops={localShops} />
        </section>

        <section className="bg-[#0f0f12] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">MASSAGE SERVICE STEP</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 마사지 이용 방법</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">지역 확인</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 희망 위치 전달</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">방문 희망 시간대 확인</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">프로그램 선택</h4>
              <p className="text-xs text-gray-400 mt-1">타이 / 아로마 / 스웨디시</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">방문 후 결제</h4>
              <p className="text-xs text-gray-400 mt-1">도착 후 100% 후불 결제</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 text-xs"
            >
              <span>🤝</span> 제휴문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-bold">무드앤휴는 건전한 방문 힐링 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 무드앤휴 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}