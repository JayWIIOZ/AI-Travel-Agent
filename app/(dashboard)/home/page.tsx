// src/app/(dashboard)/page.tsx
import HeroSection from "@/components/dashboard/HeroSection";
import FeaturedTripCard from "@/components/dashboard/TripCard";

const MOCK_TRIPS = [
  {
    id: 1,
    title: "京都·岚山晚樱私藏路线",
    location: "Kyoto, Japan",
    weather: "22°C Sunny",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
    rating: "4.9",
    reviews: 128,
    days: 5,
    price: "8,500",
    participants: ["https://avatar.vercel.sh/1", "https://avatar.vercel.sh/2"],
  },
  {
    id: 2,
    title: "冰岛·瓦特纳冰川徒步",
    location: "Iceland",
    weather: "-2°C Snowy",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000",
    rating: "5.0",
    reviews: 86,
    days: 7,
    price: "15,200",
    participants: [
      "https://avatar.vercel.sh/3",
      "https://avatar.vercel.sh/4",
      "https://avatar.vercel.sh/5",
    ],
  },
  {
    id: 3,
    title: "大理·洱海边的慢生活",
    location: "Dali, China",
    weather: "18°C Breezy",
    image:
      "https://images.unsplash.com/photo-1520114878144-6123749968dd?auto=format&fit=crop&q=80&w=1000",
    rating: "4.8",
    reviews: 245,
    days: 3,
    price: "2,800",
    participants: ["https://avatar.vercel.sh/6"],
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 min-h-screen bg-natural-gradient px-8 py-10 overflow-y-auto">
      {/* 顶部 Hero：负责提供冲动 */}
      <HeroSection />

      {/* 底部计划卡片：负责落地执行 */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              为您精心编织
            </h2>
            <p className="text-slate-500 font-medium">
              AI 根据您的历史偏好，实时生成的灵感计划
            </p>
          </div>
          <button className="text-emerald-600 font-bold hover:underline">
            查看更多目的地
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_TRIPS.map((trip) => (
            <FeaturedTripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
}
