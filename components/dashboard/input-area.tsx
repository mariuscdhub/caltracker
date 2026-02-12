"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRightLeft, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Database (simulating Supabase)
interface Food {
    id: string;
    name: string;
    kcalRaw: number;    // per 100g
    kcalCooked: number; // per 100g
    proteinRaw: number;
    proteinCooked: number;
    density: number;    // cooked weight / raw weight factor (e.g., 0.8 for chicken, 2.5 for rice)
}

const FOOD_DB: Food[] = [
    { id: "1", name: "Riz Basmati", kcalRaw: 360, kcalCooked: 130, proteinRaw: 7, proteinCooked: 2.5, density: 2.8 },
    { id: "2", name: "Poulet (Blanc)", kcalRaw: 110, kcalCooked: 165, proteinRaw: 23, proteinCooked: 31, density: 0.7 },
    { id: "3", name: "Pâtes Complètes", kcalRaw: 350, kcalCooked: 124, proteinRaw: 13, proteinCooked: 5, density: 2.5 },
    { id: "4", name: "Boeuf 5%", kcalRaw: 130, kcalCooked: 180, proteinRaw: 21, proteinCooked: 28, density: 0.7 },
    { id: "5", name: "Avocat", kcalRaw: 160, kcalCooked: 160, proteinRaw: 2, proteinCooked: 2, density: 1 }, // No cooking change
];

export function InputArea() {
    const [type, setType] = useState<"RAW" | "COOKED">("RAW");
    const [search, setSearch] = useState("");
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);

    // Input states
    const [weight, setWeight] = useState<string>("");
    const [calories, setCalories] = useState<string>("");

    // Filtered list
    const filteredFoods = search.length > 0
        ? FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    const handleSelectFood = (food: Food) => {
        setSelectedFood(food);
        setSearch("");
        // Reset inputs when changing food
        setWeight("");
        setCalories("");
    };

    const handleWeightChange = (val: string) => {
        setWeight(val);
        if (!selectedFood || !val) {
            setCalories("");
            return;
        }
        const w = parseFloat(val);
        if (isNaN(w)) return;

        // RULE OF 3: (Weight / 100) * KcalPer100
        const factor = type === "RAW" ? selectedFood.kcalRaw : selectedFood.kcalCooked;
        const calc = (w / 100) * factor;
        setCalories(Math.round(calc).toString());
    };

    const handleCaloriesChange = (val: string) => {
        setCalories(val);
        if (!selectedFood || !val) {
            setWeight("");
            return;
        }
        const c = parseFloat(val);
        if (isNaN(c)) return;

        // REVERSE RULE OF 3: (Kcal / KcalPer100) * 100
        const factor = type === "RAW" ? selectedFood.kcalRaw : selectedFood.kcalCooked;
        const calc = (c / factor) * 100;
        setWeight(Math.round(calc).toString());
    };

    // Re-calculate when toggling RAW/COOKED
    useEffect(() => {
        if (selectedFood && weight) {
            handleWeightChange(weight);
        }
    }, [type, selectedFood]);

    return (
        <div className="space-y-4 animate-slideUp">
            {/* Raw/Cooked Toggle */}
            <div className="glass-panel p-1 rounded-xl flex">
                <button
                    onClick={() => setType("RAW")}
                    className={cn(
                        "flex-1 py-3 text-sm font-black tracking-widest rounded-lg transition-all duration-300",
                        type === "RAW"
                            ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                            : "text-muted-foreground hover:text-white"
                    )}
                >
                    CRU
                </button>
                <button
                    onClick={() => setType("COOKED")}
                    className={cn(
                        "flex-1 py-3 text-sm font-black tracking-widest rounded-lg transition-all duration-300",
                        type === "COOKED"
                            ? "bg-orange-500 text-black shadow-[0_0_20px_rgba(251,146,60,0.3)]"
                            : "text-muted-foreground hover:text-white"
                    )}
                >
                    CUIT
                </button>
            </div>

            {/* Search Bar / Selected Display */}
            {selectedFood ? (
                <div className="glass-panel rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 border-l-4"
                    style={{ borderLeftColor: type === 'RAW' ? '#10b981' : '#f97316' }}>
                    <div>
                        <span className="font-bold text-lg text-white block">{selectedFood.name}</span>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider",
                            type === 'RAW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                        )}>
                            {type === "RAW" ? selectedFood.kcalRaw : selectedFood.kcalCooked} kcal / 100g
                        </span>
                    </div>
                    <button
                        onClick={() => setSelectedFood(null)}
                        className="p-2 text-muted-foreground hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Chercher (ex: Riz, Poulet...)"
                        className="w-full glass-panel rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/20 transition-all font-medium"
                    />
                    {/* Dropdown Results */}
                    {search.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-xl overflow-hidden z-50 backdrop-blur-xl shadow-2xl">
                            {filteredFoods.map(food => (
                                <button
                                    key={food.id}
                                    onClick={() => handleSelectFood(food)}
                                    className="w-full text-left p-4 hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors flex justify-between items-center group"
                                >
                                    <span className="font-bold text-white max-w-[70%] truncate">{food.name}</span>
                                    <span className="text-xs text-muted-foreground group-hover:text-emerald-400 transition-colors">Select &rarr;</span>
                                </button>
                            ))}
                            {filteredFoods.length === 0 && (
                                <div className="p-4 text-center text-muted-foreground text-sm">Aucun résultat</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Conversion Input */}
            <div className={cn("flex gap-4 transition-all duration-500", !selectedFood && "opacity-50 pointer-events-none grayscale blur-sm")}>
                <div className="flex-1 glass-panel rounded-xl p-4 flex items-center justify-between group focus-within:border-emerald-500/50 transition-colors">
                    <input
                        type="number"
                        placeholder="0"
                        value={weight}
                        onChange={(e) => handleWeightChange(e.target.value)}
                        className="bg-transparent text-xl font-bold w-full outline-none text-white placeholder:text-muted-foreground/50 tabular-nums text-center"
                    />
                    <span className="text-xs font-bold text-muted-foreground ml-2 uppercase pointer-events-none">g</span>
                </div>

                <div className="flex items-center justify-center text-muted-foreground">
                    <ArrowRightLeft className="w-5 h-5" />
                </div>

                <div className="flex-1 glass-panel rounded-xl p-4 flex items-center justify-between group focus-within:border-emerald-500/50 transition-colors">
                    <input
                        type="number"
                        placeholder="0"
                        value={calories}
                        onChange={(e) => handleCaloriesChange(e.target.value)}
                        className={cn(
                            "bg-transparent text-xl font-bold w-full outline-none placeholder:text-muted-foreground/50 tabular-nums text-center",
                            type === "RAW" ? "text-emerald-500" : "text-orange-500"
                        )}
                    />
                    <span className={cn(
                        "text-xs font-bold ml-2 uppercase pointer-events-none",
                        type === "RAW" ? "text-emerald-500" : "text-orange-500"
                    )}>CAL</span>
                </div>
            </div>
        </div>
    );
}
