"use client";

import { MobileContainer } from "@/components/layout/mobile-container";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsPage() {
    return (
        <MobileContainer className="space-y-6">
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-black font-black text-lg">C</div>
                    <span className="font-bold tracking-tight text-white">CALTRACKER</span>
                </div>
                <button className="text-muted-foreground hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                </button>
            </header>

            {/* Streak Card */}
            <div className="bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Flame className="w-16 h-16 text-orange-500 mb-4 fill-orange-500 animate-pulse" />
                <span className="text-6xl font-black text-white tracking-tighter mb-2">0</span>
                <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">Commencez votre série !</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Jours Suivis</p>
                    <p className="text-2xl font-black text-white">0</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Taux de réussite</p>
                    <p className="text-2xl font-black text-emerald-500">0%</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Moy. Calories</p>
                    <p className="text-2xl font-black text-white">0</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Jours Validés</p>
                    <p className="text-2xl font-black text-emerald-500">0</p>
                </div>
            </div>

            {/* Calendar Placeholder (Visual Only) */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <button className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
                    <span className="font-bold text-white">Février 2026</span>
                    <button className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground mb-2">
                    <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                </div>
                {/* Mock Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 text-center">
                    {Array.from({ length: 28 }, (_, i) => (
                        <div key={i} className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mx-auto",
                            i === 10 ? "border border-emerald-500 text-white shadow shadow-emerald-500/20" : "text-white/20"
                        )}>
                            {i + 1}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-6 text-[10px] font-bold text-muted-foreground">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-900" />{"<50%"}</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-yellow-900" />{"50-90%"}</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-900" />{"90-110%"}</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-900" />{">110%"}</div>
                </div>
            </div>

        </MobileContainer>
    );
}
