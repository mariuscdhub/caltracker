"use client";

import { MobileContainer } from "@/components/layout/mobile-container";
import { MacroStats } from "@/components/dashboard/macro-stats";
import { InputArea } from "@/components/dashboard/input-area";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function TrackerPage() {
    return (
        <MobileContainer className="space-y-8">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-black font-black text-lg">C</div>
                    <span className="font-bold tracking-tight text-white">CALTRACKER</span>
                </div>
                <button className="text-muted-foreground hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                </button>
            </header>

            {/* Main Stats */}
            <MacroStats remaining={2500} goal={2500} />

            {/* Input Area */}
            <InputArea />

            {/* Recent Logs List (Placeholder for now) */}
            <div className="space-y-4 pt-4">
                {/* Empty state or list would go here */}
            </div>

        </MobileContainer>
    );
}
