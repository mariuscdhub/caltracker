"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

interface MacroStatsProps {
    remaining: number;
    goal: number;
    className?: string;
}

export function MacroStats({ remaining, goal, className }: MacroStatsProps) {
    const percentage = Math.min(100, Math.max(0, ((goal - remaining) / goal) * 100));

    return (
        <div className={cn("relative space-y-4", className)}>
            <div className="flex justify-between items-end px-2">
                <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Restant</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white tracking-tighter leading-none">{remaining}</span>
                        <span className="text-sm font-bold text-muted-foreground pb-1.5">kcal</span>
                    </div>
                </div>
                <div className="text-right space-y-1 pb-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Objectif</p>
                    <div className="flex items-center gap-2 justify-end">
                        <div className="w-5 h-5 rounded-full border-2 border-white/10 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-white/20" />
                        </div>
                        <span className="text-xl font-bold text-muted-foreground/80 font-mono tracking-tight">{goal}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-orange-500 to-red-500 transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
