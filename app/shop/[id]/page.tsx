"use client";

import { use } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const shopData: Record<string, {
  name: string;
  phone: string;
  location: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "🔥 한국미인홈케어",
    phone: "0507-1280-3303",
    location: "서울 · 경기 · 인천 전지역 25분 내 신속 방문",
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
    desc: "지친 일상을 깨우는 정성 가득한 테라피! 최고급 베테랑 힐러진이 고객님의 공간으로 직접 찾아갑니다.",
    courses: [
      { name: "20대 혼혈 스웨디시", time: "60분", price: "110,000원", desc: "뭉친 근육과 피로를 집중적으로 풀어주는 기본 건식 테라피" },
      { name: "20대 혼혈 스웨디시", time: "90분", price: "130,000원", desc: "뭉친 근육과 피로를 집중적으로 풀어주는 기본 건식 테라피" },
      { name: "한국 VIP스웨디시", time: "60분", price: "140,000원", desc: "최고급 천연 오일로 전신을 부드럽게 이완시키는 힐링 코스" },
      { name: "한국 VIP스웨디시", time: "90분", price: "180,000원", desc: "건식+아로마+집중케어가 결합된 최고급 풀케어 코스" }
    ],
    features: ["100% 후불제 안심결제", "24시간 365일 연중무휴", "수도권 전지역 25분 칼도착", "위생 및 방역 관리 철저"]
  },
  "2": {
    name: "✨ 오늘밤테라피",
    phone: "0507-1280-3223",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "품격 있는 힐링을 선사하는 프라이빗 케어! 최고급 오일과 맞춤형 테라피로 특별한 휴식을 드립니다.",
    courses: [
      { name: "맞춤형 바디 건식케어", time: "60분", price: "60,000원", desc: "부담 없이 가볍게 상/하체 피로를 푸는 실속 코스" },
      { name: "스페셜 아로마 테라피", time: "60분", price: "80,000원", desc: "부드러운 오일 압으로 스트레스와 피로를 완화하는 코스" },
      { name: "VIP 감성힐링 스웨디시", time: "60분", price: "90,000원", desc: "부담 없이 가볍게 상/하체 피로를 푸는 실속 코스" },
      { name: "VVIP 스페셜코스", time: "60분", price: "100,000원", desc: "상/하체 피로를 푸는 최고급 풀케어 코스" },
      { name: "한국인 스웨디시", time: "60분", price: "140,000원", desc: "여유로운 시간 동안 전신 스트레칭과 아로마 케어 동시 진행" }
    ],
    features: ["100% 후불제 안심결제", "친절 마인드 힐러 상시 대기", "카드/현금/계좌이체 가능"]
  },
  "3": {
    name: "💎 주주테라피",
    phone: "0507-1280-3193",
    location: "서울 · 경기 · 인천 전지역 신속 도착",
    badge: "24시 상시 할인",
    image: "/shop3.jpg",
    desc: "칼도착 25분 보장! 철저한 위생 관리와 럭셔리한 서비스로 완벽한 피로 회복을 약속드립니다.",
    courses: [
      { name: "스탠다드 타이 코스", time: "60분", price: "60,000원", desc: "전신 스트레칭 중심의 뻐근함 해소 케어" },
      { name: "프리미엄 딥티슈 아로마", time: "90분", price: "90,000원", desc: "피부 마찰 없이 뭉친 근육 깊은 곳까지 풀어주는 테라피" },
      { name: "VIP 럭셔리 힐링", time: "120분", price: "120,000원", desc: "머리부터 발끝까지 집중 케어해주는 시그니처 코스" }
    ],
    features: ["선입금 0원 100% 후불제", "평균 25분 방문 보장", "개인정보 완벽 보호"]
  },
  "4": {
    name: "🌟퀸즈홈테라피",
    phone: "0507-1280-3334",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "젊은 감성 베테랑",
    image: "/shop4.jpg",
    desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램! 차원이 다른 프리미엄 방문케어를 경험해보세요.",
    courses: [
      { name: "건식힐링 코스", time: "60분", price: "60,000원", desc: "원하는 부위를 집중적으로 풀어주는 릴렉싱 코스" },
      { name: "아로마힐링 코스", time: "60분", price: "70,000원", desc: "원하는 부위를 집중적으로 풀어주는 릴렉싱 코스" },
      { name: "VIP스페셜코스", time: "60분", price: "100,000원", desc: "부드럽고 림프순환을 돕는 감성 스웨디시 케어" },
      { name: "한국 관리사 코스", time: "60분", price: "150,000원", desc: "최고의 힐링을 선사하는 프리미엄 풀코스" }
    ],
    features: ["젊고 세련된 감성 테라피", "100% 후불 결제", "24시간 항시 대기"]
  },
  "5": {
    name: "👑 한국골든테라피",
    phone: "0507-1280-3360",
    location: "서울 · 경기 · 인천 전지역 실시간 방문",
    badge: "인기도 TOP 5",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제 안심 이용! 수도권 전지역 평균 25분 내 칼같이 도착합니다.",
    courses: [
      { name: "20대 혼혈 프리미엄 코스", time: "60분", price: "110,000원", desc: "지친 피로를 깔끔하게 해소하는 기본 건식 케어" },
      { name: "20대 혼혈 프리미엄 코스", time: "90분", price: "130,000원", desc: "향기로운 아로마 향과 함께하는 부드러운 릴렉싱" },
      { name: "20대 혼혈 프리미엄 코스", time: "120분", price: "150,000원", desc: "향기로운 아로마 향과 함께하는 부드러운 릴렉싱" },
      { name: "한국인 골든 스웨디시 코스", time: "60분", price: "140,000원", desc: "향기로운 아로마 향과 함께하는 부드러운 릴렉싱" },
      { name: "한국인 골든 스웨디시 코스", time: "90분", price: "190,000원", desc: "전신 집중 케어와 함께하는 완벽한 피로 회복" }
    ],
    features: ["100% 후불제", "수도권 전지역 빠른 도착", "고객 만족도 최상"]
  }
};

export default function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const shopId = resolvedParams.id;
  
  const shop = shopData[shopId];

  if (!shop) {
    return (
      <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black text-amber-400">존재하지 않는 제휴점입니다.</h1>
          <p className="text-sm text-gray-400">올바른 경로로 접근해 주세요.</p>
          <Link href="/" className="inline-block bg-amber-500 text-black font-bold px-6 py-2.5 rounded-xl">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-24">
      
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
              <span className="text-[10px] text-gray-400 tracking-tighter">PREMIUM LANDING SHOP</span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            🏠 메인으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={shop.name} 
              className="w-full h-full object-cover filter brightness-[0.7]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {shop.location}
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white">
              {shop.name}
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 */}
        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">COURSE & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 대표 코스 및 요금 안내</h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-[10px] font-black px-2 py-0.5 rounded border border-red-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 안내사항 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> 이용 예약 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>무드앤휴 제휴업체는 <strong>100% 후불제</strong>로 운영됩니다. 도착 전 선입금을 요구하지 않습니다.</li>
            <li>희망하시는 시간 20~30분 전에 미리 예약 문의 주시면 원활한 서비스가 가능합니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone}?body=${encodeURIComponent(`${shop.name} 문의드립니다. (무드앤휴 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}