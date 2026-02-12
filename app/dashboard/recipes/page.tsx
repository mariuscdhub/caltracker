"use client";

import { MobileContainer } from "@/components/layout/mobile-container";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const recipes = [
    { id: 1, name: "Poulet Riz Brocolis", calories: 650 },
    { id: 2, name: "Petit Déjeuner Avoine", calories: 450 },
];

export default function RecipesPage() {
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
                <h1 className="text-2xl font-black text-white">Recettes</h1>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Create Button */}
            <button className="w-full py-4 border border-dashed border-emerald-500/50 rounded-xl flex items-center justify-center text-emerald-500 font-bold hover:bg-emerald-500/10 transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                Créer une recette
            </button>

            {/* Recipes List */}
            <div className="space-y-3">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-colors">
                        <div>
                            <h3 className="font-bold text-white mb-1">{recipe.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded font-bold">{recipe.calories} kcal</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MobileContainer>
    );
}
