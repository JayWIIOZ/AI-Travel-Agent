// src/components/dashboard/featured-trip-card.tsx
import { MapPin, CloudSun, Users, Heart, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const FeaturedTripCard = ({ trip }: { trip: any }) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] p-4 shadow-soft hover:shadow-2xl transition-all duration-500">
      {/* 拍立得风格图片容器 */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* 顶部悬浮标记 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-white/80 backdrop-blur-md text-emerald-700 hover:bg-white border-none shadow-sm gap-1 px-3 py-1">
            <CloudSun className="w-3 h-3" /> {trip.weather}
          </Badge>
          <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 底部悬浮信息 */}
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter opacity-80">
            <MapPin className="w-3 h-3" /> {trip.location}
          </div>
          <h3 className="text-lg font-bold leading-tight">{trip.title}</h3>
        </div>
      </div>

      {/* 卡片详情区：理性与温情的结合 */}
      <div className="px-3 pt-5 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="text-sm font-bold text-slate-700">
              {trip.rating}
            </span>
            <span className="text-xs text-slate-400">
              ({trip.reviews} reviews)
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            {trip.days} Days
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex -space-x-2">
            {trip.participants.map((p: string, i: number) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 relative overflow-hidden shadow-sm"
              >
                <Image src={p} fill alt="avatar" className="object-cover" sizes="32px" unoptimized />
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">
              Estimated
            </p>
            <p className="text-lg font-extrabold text-slate-900">
              ￥{trip.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTripCard;
