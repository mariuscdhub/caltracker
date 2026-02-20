
"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateRecipeDialog() {
    const [isOpen, setIsOpen] = useState(false);

    // Full implementation would require a multi-step form to select foods.
    // For this MVP step, we'll keep it as a placeholder or simple form.

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="w-full glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-colors group mb-6 border-dashed border-2 border-white/10 hover:border-white/20"
        >
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-white">Créer une Recette</span>
        </button>
    );
}
