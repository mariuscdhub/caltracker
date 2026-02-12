"use client";

import { MobileContainer } from "@/components/layout/mobile-container";
import { Search, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for now
const fridgeItems = [
    { id: 1, name: "Avocat", type: "CRU", details: "160 kcal / 2g prot" },
    { id: 2, name: "Banane", type: "CRU", details: "89 kcal / 1.1g prot" },
    { id: 3, name: "Beurre", type: "CRU", details: "717 kcal / 0.8g prot" },
    { id: 4, name: "Blanc de Poulet", type: "CRU", details: "105 kcal / 23g prot" },
];

export default function FridgePage() {
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

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-white">Mon Frigo</h1>
                <button className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 transition-all">
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                    type="text"
                    placeholder="Chercher..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/20 transition-colors"
                />
            </div>

            {/* Food List */}
            <div className="space-y-3">
                {fridgeItems.map((item) => (
                    <div key={item.id} className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white">{item.name}</span>
                                <span className="text-[10px] bg-white/10 text-muted-foreground px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">{item.type}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.details}</p>
                        </div>
                        <button className="text-muted-foreground hover:text-destructive transition-colors p-2">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </MobileContainer>
    );
}
