"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ShopItem {
  id: number;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

export default function ClientShopList({ initialShops }: { initialShops: ShopItem[] }) {
  const [shops, setShops] = useState<ShopItem[]>(initialShops);

  // 새로고침할 때마다 5개 매장의 순서를 무작위로 셔플
  useEffect(() => {
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, [initialShops]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {shops.map((lShop) => (
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
  );
}