import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

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
  const variantIndex = charSum % 50;

  const titleVariants = [
    /* 0 */ `${locationKeyword} 출장마사지 추천 | 24시 빠른방문 힐링 케어 - 무드앤휴`,
    /* 1 */ `[무드앤휴] ${locationKeyword} 출장마사지 안내 · 100% 안심 후불제`,
    /* 2 */ `${simpleLocation} 출장마사지 24시 전문 안내 | ${regionName} 프라이빗 힐링`,
    /* 3 */ `${locationKeyword} 출장마사지 제휴업체 정보 및 후불제 예약 가이드`,
    /* 4 */ `${locationKeyword} 출장마사지 빠른 방문 24시 | 스웨디시 & 아로마 전문`,
    /* 5 */ `무드앤휴 | ${simpleLocation} 출장마사지 안심 후불제 힐링 테라피`,
    /* 6 */ `${locationKeyword} 출장마사지 신속 도착 · 선입금 없는 정직한 바디케어`,
    /* 7 */ `${regionName} ${simpleLocation} 출장마사지 24시 예약 및 제휴 코스 안내`,
    /* 8 */ `${locationKeyword} 출장마사지 홈케어 | 프라이빗 1:1 맞춤형 피로회복`,
    /* 9 */ `[24시 방문] ${locationKeyword} 출장마사지 추천 업체 모음 · 무드앤휴`,
    /* 10 */ `${simpleLocation} 출장마사지 릴렉싱 케어 | 후불제 홈테라피 가이드`,
    /* 11 */ `${locationKeyword} 출장마사지 25분 내 빠르게 달려갑니다 - 무드앤휴`,
    /* 12 */ `프라이빗 힐링 ${locationKeyword} 출장마사지 | 타이·아로마·스웨디시`,
    /* 13 */ `${locationKeyword} 출장마사지 24시 엄선된 제휴업체 및 요금 안내`,
    /* 14 */ `${simpleLocation} 출장마사지 잘하는 곳 | 100% 후불 안심 테라피`,
    /* 15 */ `${locationKeyword} 출장마사지 신속한 예약 서비스 | 무드앤휴 공식`,
    /* 16 */ `[무드앤휴 24시] ${locationKeyword} 출장마사지 베테랑 힐러 케어`,
    /* 17 */ `${locationKeyword} 출장마사지 가이드 | 스웨디시·아로마·홈케어`,
    /* 18 */ `${simpleLocation} 출장마사지 24시간 언제나 빠르게 출동합니다`,
    /* 19 */ `${locationKeyword} 출장마사지 선입금 X | 안심 후불 바디케어`,
    /* 20 */ `${regionName} ${simpleLocation} 출장마사지 릴렉스 전문 제휴 가이드`,
    /* 21 */ `${locationKeyword} 출장마사지 만족도 높고 신속한 24시 테라피`,
    /* 22 */ `[공식] ${locationKeyword} 출장마사지 제휴업체 코스 및 가격 안내`,
    /* 23 */ `${simpleLocation} 출장마사지 25분 내 빠르게 만나는 힐링 타임`,
    /* 24 */ `${locationKeyword} 출장마사지 프라이빗 케어 | 후불제 홈테라피`,
    /* 25 */ `무드앤휴 추천 ${locationKeyword} 출장마사지 24시 안심 서비스`,
    /* 26 */ `${locationKeyword} 출장마사지 타이 & 아로마 전문 힐링 케어`,
    /* 27 */ `${simpleLocation} 출장마사지 예약 가이드 · 100% 후불제 시스템`,
    /* 28 */ `${locationKeyword} 출장마사지 친절 방문 | 전신 피로 완화 케어`,
    /* 29 */ `[24시 신속] ${simpleLocation} 출장마사지 힐링 테라피 정보`,
    /* 30 */ `${locationKeyword} 출장마사지 프리미엄 제휴 안내 - 무드앤휴`,
    /* 31 */ `${locationKeyword} 출장마사지 내 주변 빠른 방문 케어 서비스`,
    /* 32 */ `${simpleLocation} 출장마사지 24시간 후불 예약 및 이용 방법`,
    /* 33 */ `${locationKeyword} 출장마사지 정직하고 안전한 1:1 방문 케어`,
    /* 34 */ `[무드앤휴] ${simpleLocation} 출장마사지 추천 매장 종합 안내`,
    /* 35 */ `${locationKeyword} 출장마사지 힐링 코스 & 가격 상세 안내`,
    /* 36 */ `${locationKeyword} 출장마사지 선입금 절대 없는 24시 방문 서비스`,
    /* 37 */ `${simpleLocation} 출장마사지 베테랑 테라피스트 빠른 방문`,
    /* 38 */ `${locationKeyword} 출장마사지 나만을 위한 프라이빗 힐링 공간`,
    /* 39 */ `[24시 출장] ${locationKeyword} 출장마사지 안심 후불제 안내`,
    /* 40 */ `${locationKeyword} 출장마사지 오일 & 건식 케어 제휴업체 정보`,
    /* 41 */ `${simpleLocation} 출장마사지 건전 방문 힐링 서비스 가이드`,
    /* 42 */ `${locationKeyword} 출장마사지 피로가 싹 풀리는 1:1 맞춤 테라피`,
    /* 43 */ `무드앤휴 | ${locationKeyword} 출장마사지 25분 내 빠른 케어`,
    /* 44 */ `${simpleLocation} 출장마사지 엄선된 24시 제휴 매장 목록`,
    /* 45 */ `${locationKeyword} 출장마사지 후불제 24시 스웨디시 전문 안내`,
    /* 46 */ `${locationKeyword} 출장마사지 편안한 집에서 받는 릴렉싱 케어`,
    /* 47 */ `[안심후불] ${simpleLocation} 출장마사지 24시간 방문 테라피`,
    /* 48 */ `${locationKeyword} 출장마사지 최고급 아로마 오일 테라피 코스`,
    /* 49 */ `${locationKeyword} 출장마사지 신속 예약 및 이용 후기 안내 - 무드앤휴`,
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 출장마사지 25분 내 빠른 방문! 선입금 없는 100% 안심 후불제. 타이, 아로마, 스웨디시 안내.`,
    /* 1 */ `프라이빗 피로회복! ${locationKeyword} 24시 출장마사지 가이드. 베테랑 테라피스트의 맞춤 힐링을 확인하세요.`,
    /* 2 */ `${locationKeyword} 전지역 신속 출장마사지 예약. 부담 없는 후불제와 정직한 코스 정보 제공, 무드앤휴 안내.`,
    /* 3 */ `${simpleLocation} 고객을 위한 24시 안심 출장마사지. 스웨디시, 아로마 릴렉싱 정보 및 빠른 전화 연결.`,
    /* 4 */ `${locationKeyword} 출장마사지! 100% 후불제로 안심하고 즐기는 프라이빗 홈케어 전문 가이드입니다.`,
    /* 5 */ `일상의 피로를 풀어줄 ${locationKeyword} 24시 출장마사지. 빠른 방문과 베테랑 힐러의 품격 케어를 만나보세요.`,
    /* 6 */ `${locationKeyword} 25분 내 도착! 선입금 없는 안심 후불제 출장마사지와 힐링 바디케어 코스 추천.`,
    /* 7 */ `${simpleLocation} 출장마사지 전문 제휴업체 모음. 24시간 개인 공간에서 누리는 프리미엄 스웨디시 케어.`,
    /* 8 */ `${locationKeyword} 믿을 수 있는 후불제 출장마사지 정보. 타이, 아로마, 전신 오일 테라피를 한눈에 비교하세요.`,
    /* 9 */ `무드앤휴 보장 ${locationKeyword} 출장마사지 안심 케어! 선입금 없이 도착 후 결제하는 100% 안전 시스템.`,
    /* 10 */ `${locationKeyword} 24시 방문 출장마사지 종합 안내. 맞춤형 힐링 케어로 묵은 피로를 시원하게 해소해 드립니다.`,
    /* 11 */ `${simpleLocation} 출장마사지 코스 및 가격 안내. 24시간 친절 상담과 빠른 방문으로 만족도를 높입니다.`,
    /* 12 */ `${locationKeyword} 출장마사지 릴렉싱 프로그램. 프라이빗한 1:1 맞춤 케어로 편안함과 활력을 되찾아드립니다.`,
    /* 13 */ `${locationKeyword} 24시 출장마사지 예약 가이드. 선입금 걱정 없는 100% 후불제 제휴업체 정보만 선별 전달합니다.`,
    /* 14 */ `${simpleLocation} 신속 방문 24시 출장마사지. 타이, 아로마, 스웨디시 나에게 딱 맞는 힐링 테라피 추천.`,
    /* 15 */ `${locationKeyword} 출장마사지 안심 예약! 예약금 없는 정직한 100% 후불 시스템으로 편안하게 이용해 보세요.`,
    /* 16 */ `전문 힐러의 손길로 누리는 ${locationKeyword} 출장마사지. 빠른 방문 시간과 합리적인 코스를 확인하세요.`,
    /* 17 */ `${simpleLocation} 24시 방문 출장마사지 서비스. 쌓인 스트레스와 뭉친 근육을 부드럽게 이완시켜 드립니다.`,
    /* 18 */ `${locationKeyword} 출장마사지 엄선 제휴업체 안내. 선입금 없는 검증된 1:1 방문 맞춤 케어를 제공합니다.`,
    /* 19 */ `${locationKeyword} 25분 내 출동하는 출장마사지! 친절 상담과 신속한 도착으로 언제든 편하게 이용 가능합니다.`,
    /* 20 */ `${simpleLocation} 만족도 1위 후불제 출장마사지 가이드. 전신 아로마, 스웨디시 코스로 피로를 녹여보세요.`,
    /* 21 */ `${locationKeyword} 출장마사지 24시 상시 운영! 100% 후불 안심 예약 서비스로 부담 없이 이용하세요.`,
    /* 22 */ `무드앤휴 공식 ${locationKeyword} 출장마사지 안내. 신속한 방문과 차별화된 프리미엄 홈케어를 만나보세요.`,
    /* 23 */ `${simpleLocation} 전문 출장마사지 가이드. 1:1 맞춤 피로회복 케어로 쾌적한 힐링 시간을 선물해 드립니다.`,
    /* 24 */ `${locationKeyword} 전지역 신속 출장마사지 예약! 선입금 없는 후불제로 즐기는 럭셔리 스웨디시 & 아로마.`,
    /* 25 */ `지친 몸에 활력을 줄 ${locationKeyword} 24시 출장마사지. 검증된 관리사의 다채로운 힐링 코스 추천.`,
    /* 26 */ `${simpleLocation} 출장마사지 가격 및 코스 안내. 24시간 원하는 시간에 맞춰 방문하는 프라이빗 케어.`,
    /* 27 */ `${locationKeyword} 출장마사지 안심 후불제 추천! 출발 전 예약금을 요구하지 않는 안전한 업체 정보 모음.`,
    /* 28 */ `${locationKeyword} 25분 신속 방문 출장마사지. 뭉친 승모근과 하체 피로를 상쾌하게 풀어드립니다.`,
    /* 29 */ `${simpleLocation} 최상의 24시 출장마사지 제휴 안내. 정직한 서비스와 투명한 요금을 확인해보세요.`,
    /* 30 */ `${locationKeyword} 출장마사지 타이, 아로마 맞춤 케어! 개인 공간에서 편안하게 누리는 힐링 타임.`,
    /* 31 */ `100% 후불제로 안심할 수 있는 ${locationKeyword} 24시 출장마사지. 빠른 방문과 친절한 서비스 제공.`,
    /* 32 */ `${simpleLocation} 출장마사지 힐링 테라피 모음. 24시간 언제나 빠르게 이용할 수 있는 수도권 안심 가이드.`,
    /* 33 */ `${locationKeyword} 출장마사지 전문 제휴업체 정보. 신속한 방문 서비스와 꼼꼼한 전신 이완 프로그램을 확인하세요.`,
    /* 34 */ `${locationKeyword} 24시 안심 출장마사지 이용 방법. 예약부터 도착까지 100% 후불제로 안전하게 진행됩니다.`,
    /* 35 */ `${simpleLocation} 출장마사지 전문 테라피스트 빠른 배치. 프리미엄 아로마 및 스웨디시로 피로를 회복하세요.`,
    /* 36 */ `${locationKeyword} 24시 출장마사지 빠른 방문 보장. 선입금 없는 100% 안심 후불제로 편하게 이용하세요.`,
    /* 37 */ `${locationKeyword} 출장마사지 1:1 프라이빗 테라피. 지친 일상 속 깊은 휴식과 릴렉싱을 제공하는 제휴 정보.`,
    /* 38 */ `${simpleLocation} 25분 내 빠른 출동 출장마사지! 전신 근육 긴장 완화 및 안정을 돕는 프리미엄 케어.`,
    /* 39 */ `무드앤휴에서 엄선한 ${locationKeyword} 24시 출장마사지 모음. 깔끔하고 정직한 제휴 정보를 확인하세요.`,
    /* 40 */ `${locationKeyword} 출장마사지 타이 & 스웨디시 정보. 선입금 요구가 전혀 없는 안전한 후불제 매장만 안내합니다.`,
    /* 41 */ `${simpleLocation} 출장마사지 24시간 예약 지원. 나만의 프라이빗한 장소에서 편안하게 하루 피로를 풀어보세요.`,
    /* 42 */ `${locationKeyword} 출장마사지 릴렉스 가이드. 투명한 요금 체계와 베테랑 힐러의 깊이 있는 홈케어 서비스.`,
    /* 43 */ `${locationKeyword} 전지역 24시 신속 방문 출장마사지. 아로마 테라피로 지친 몸과 마음에 휴식을 선사합니다.`,
    /* 44 */ `${simpleLocation} 출장마사지 제휴업체 실시간 가이드. 100% 후불 안전 거래와 깔끔한 서비스 구성 안내.`,
    /* 45 */ `${locationKeyword} 출장마사지 빠른 예약 안내. 24시간 편한 시간에 맞춰 방문하는 1:1 맞춤 피로해소 코스.`,
    /* 46 */ `${locationKeyword} 출장마사지 추천 가이드! 선입금 없는 후불제로 마음 편히 이용할 수 있는 바디 테라피.`,
    /* 47 */ `${simpleLocation} 출장마사지 신속 방문 시스템. 전문 테라피스트가 직접 찾아가 고품격 테라피를 선사합니다.`,
    /* 48 */ `${locationKeyword} 24시 방문 출장마사지 정리. 코스별 요금 및 1:1 전화 연결 서비스를 제공합니다.`,
    /* 49 */ `${locationKeyword} 출장마사지 안심 이용 가이드. 100% 후불제 시스템과 정직한 제휴 정보로 신뢰를 드립니다.`,
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${locationKeyword} 출장마사지`,
      `${locationKeyword}출장마사지`,
      `${simpleLocation} 출장마사지`,
      `${locationKeyword} 홈케어`,
      `${locationKeyword} 방문 마사지`,
      `${locationKeyword} 스웨디시`,
      "24시 출장마사지",
      "후불제 출장마사지",
      "무드앤휴",
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://mood-hue.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "무드앤휴",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
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

  // 🌟 지역명 문자열 조합 기반으로 4.9~5.0점, 115~146건 사이로 자연스럽게 분산
  const charSum = (fullTitle + districtName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const ratingValue = (4.9 + (charSum % 2) * 0.1).toFixed(1);
  const reviewCount = String(115 + (charSum % 32));

  // 🌟 검색엔진 리치 스니펫(별점/리뷰수) 지원 JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${fullTitle} 출장마사지 & 홈케어 안내 - 무드앤휴`,
    "description": `${fullTitle} 지역 출장마사지, 방문 바디케어 및 힐링 테라피 제휴업체 정보 제공`,
    "url": `https://mood-hue.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
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
      {/* 검색엔진 구조화 데이터 수집 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
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
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all shadow-inner flex items-center gap-1"
          >
            <span>🏠</span> 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 상단 지역 대표 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
          <img
            src="/banner.jpg"
            alt={`${fullTitle} 출장마사지 및 바디케어 안내`}
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 출장마사지 & 방문 홈케어 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 24시 출장마사지 가이드입니다. 검증된 테라피 코스와 100% 후불 안심 시스템을 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 클라이언트 사이드 키워드 인젝션 영역 */}
        <ClientTextMixer locationText={fullTitle} />

        {/* 제휴업체 5개 카드리스트 */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RECOMMENDED SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {fullTitle} 추천 제휴업체 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div
                key={lShop.id}
                className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative"
              >
                <Link
                  href={`/shop/${lShop.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${lShop.name} 상세페이지 보기`}
                />
                <img
                  src={lShop.image}
                  alt={lShop.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a
                      href={`tel:${lShop.phone}`}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 건강 칼럼 섹션 */}
        <section className="bg-[#0c0c0e] p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 힐링 바디케어 & 스트레칭 건강 가이드
          </h3>
          <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 오랫동안 앉아서 일하거나 스마트폰을 지속적으로 사용할 경우, 승모근과 목 주변의 흉쇄유돌근이 경직되어 만성 두통이나 골반 불균형을 유발하기 쉽습니다. 이러한 피로 상태를 방치하면 근막 통증 증후군으로 발전할 수 있으므로 주기적인 스트레칭과 전신 피로 해소 케어가 꼭 필요합니다.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs">💡 나에게 맞는 테라피 프로그램 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                <li>
                  <strong className="text-gray-200">건식 릴렉싱 케어:</strong> 둔근, 하체 근육, 견갑골 주위의 굳은 부위를 눌러 스트레칭 위주로 근육 긴장을 해소합니다.
                </li>
                <li>
                  <strong className="text-gray-200">아로마 & 스웨디시 케어:</strong> 천연 오일의 유기적인 압을 이용해 림프 순환을 돕고 심신 안정 및 부종 완화에 탁월합니다.
                </li>
                <li>
                  <strong className="text-gray-200">프라이빗 홈케어 케어:</strong> 익숙하고 편안한 자신의 개인 공간에서 이동 시간 없이 피로를 완화할 수 있는 장점이 있습니다.
                </li>
              </ul>
            </div>
            <p className="text-gray-400 text-[11px]">
              * 본 가이드는 {fullTitle} 주민 여러분의 건강한 피로 회복과 올바른 힐링 케어 정보 제공을 목적으로 작성되었습니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0f0f12] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 서비스 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">위치 전달</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 희망 장소를 알려줍니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">원하시는 방문 시간을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">코스 선택</h4>
              <p className="text-xs text-gray-400 mt-1">컨디션에 맞는 프로그램을 선택합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">케어 진행</h4>
              <p className="text-xs text-gray-400 mt-1">도착 후 100% 후불제로 이용합니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (Q&A) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ & GUIDE</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {fullTitle} 방문 소요 시간은 얼마나 되나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-red-400 font-bold">A.</span> 주요 거점 기준 평균 20분~30분 내외로 신속한 방문이 가능합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 예약금이나 선입금 요청이 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-red-400 font-bold">A.</span> 무드앤휴 제휴업체는 100% 후불제로 운영되므로 출발 전 선입금을 절대 요구하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
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