"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Camera, Plus, Flame, Utensils, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFoods, addLog, type CustomFood } from "@/lib/actions";
import { analyzeFoodImageAI } from "@/lib/ai-actions";
import { CameraCapture } from "./camera-capture";

type FoodItem = CustomFood;

interface AddFoodFormProps {
    currentDate: string;
}

export function AddFoodForm({ currentDate }: AddFoodFormProps) {
    const [type, setType] = useState<'cru' | 'cuit'>('cru');
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [weightInput, setWeightInput] = useState("");
    const [caloriesInput, setCaloriesInput] = useState("");
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [imageAnalyzing, setImageAnalyzing] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("camera") === "true") {
            setIsCameraOpen(true);
            // Replace the URL to remove the parameter without triggering a refresh
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("camera");
            window.history.replaceState({}, "", newUrl.toString());
        }
    }, [searchParams]);

    // Fetch custom foods
    const { data: customFoods = [] } = useQuery({
        queryKey: ['foods', search],
        queryFn: () => getFoods(search),
        enabled: search.length > 0,
    });

    const filteredFoods = customFoods.filter(
        (f) => f.type === type && f.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 10); // Limit results

    const addLogMutation = useMutation({
        mutationFn: addLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs', currentDate] });
            setSelectedFood(null);
            setWeightInput("");
            setCaloriesInput("");
            setSearch("");
        },
    });

    const aiImageMutation = useMutation({
        mutationFn: analyzeFoodImageAI,
        onSuccess: (data) => {
            // Créer un aliment temporaire basé sur la réponse de l'IA
            const estimatedKcalPer100g = Math.round((data.calories / data.estimatedWeight) * 100);

            const aiFood: FoodItem = {
                id: "temp-ai-" + Date.now().toString(),
                name: data.displayName + " (Estimé par l'IA)",
                calories: estimatedKcalPer100g,
                protein: Math.round((data.protein / data.estimatedWeight) * 100 * 10) / 10,
                type: data.type,
                userId: "temp",
            };

            setType(data.type);
            setSelectedFood(aiFood);
            setWeightInput(data.estimatedWeight.toString());
            setCaloriesInput(data.calories.toString());
            setImageAnalyzing(false);
        },
        onError: (err: any) => {
            alert(err.message || "Erreur lors de l'analyse.");
            setImageAnalyzing(false);
        }
    });

    const handleSelect = (food: FoodItem) => {
        setSelectedFood(food);
        setSearch("");
        setWeightInput("");
        setCaloriesInput("");
    };

    const getKcalPer100g = () => {
        if (!selectedFood) return 0;
        // @ts-ignore
        return selectedFood.kcal || selectedFood.calories || 0;
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setWeightInput(val);
        const w = parseInt(val);
        if (!isNaN(w) && w > 0) {
            const cals = Math.round((getKcalPer100g() * w) / 100);
            setCaloriesInput(cals.toString());
        } else {
            setCaloriesInput("");
        }
    };

    const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCaloriesInput(val);
        const cals = parseInt(val);
        const currentKcalPer100g = getKcalPer100g();
        if (!isNaN(cals) && cals > 0 && currentKcalPer100g > 0) {
            const w = Math.round((cals * 100) / currentKcalPer100g);
            setWeightInput(w.toString());
        } else {
            setWeightInput("");
        }
    };

    const handleAddLog = () => {
        if (!selectedFood || !weightInput || !caloriesInput) return;
        const finalWeight = parseInt(weightInput);
        const finalCalories = parseInt(caloriesInput);
        const proteinCalculated = Math.round((selectedFood.protein * finalWeight / 100) * 10) / 10;

        addLogMutation.mutate({
            // Nettoyer le nom s'il vient de l'IA
            name: selectedFood.name.replace(" (Estimé par l'IA)", ""),
            weight: finalWeight,
            calories: finalCalories,
            protein: proteinCalculated,
            type: selectedFood.type,
            date: currentDate,
            foodId: String(selectedFood.id),
        });
    };

    return (
        <div className="glass-panel p-5 rounded-3xl space-y-5 animate-slide-up relative z-20">
            {isCameraOpen && (
                <CameraCapture
                    onCapture={(base64) => {
                        setIsCameraOpen(false);
                        setImageAnalyzing(true);
                        aiImageMutation.mutate(base64);
                    }}
                    onClose={() => setIsCameraOpen(false)}
                />
            )}

            {/* Type Toggle */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                <button
                    onClick={() => { setType('cru'); setSelectedFood(null); }}
                    className={cn(
                        "flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                        type === 'cru' ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-neutral-500 hover:text-neutral-300"
                    )}
                >
                    CRU
                </button>
                <button
                    onClick={() => { setType('cuit'); setSelectedFood(null); }}
                    className={cn(
                        "flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                        type === 'cuit' ? "bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "text-neutral-500 hover:text-neutral-300"
                    )}
                >
                    CUIT
                </button>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
                {!selectedFood ? (
                    <div className="relative flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Rechercher un aliment..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-black/70 transition-all"
                            />

                            {(search || isFocused) && filteredFoods.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto z-50">
                                    {filteredFoods.map(food => (
                                        <button
                                            key={food.id}
                                            onClick={() => handleSelect(food)}
                                            className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 flex justify-between items-center group"
                                        >
                                            <span className="text-white font-medium">{food.name}</span>
                                            <span className="text-xs text-neutral-500 group-hover:text-white transition-colors">
                                                {food.calories} kcal
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsCameraOpen(true)}
                            disabled={imageAnalyzing}
                            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl hover:bg-emerald-500/20 active:scale-95 transition-all flex items-center justify-center min-w-[56px]"
                        >
                            {imageAnalyzing ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <Camera className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                            <div>
                                <h4 className="font-bold text-white text-lg">{selectedFood.name}</h4>
                                <p className={cn("text-xs font-bold uppercase tracking-wider", type === 'cru' ? "text-emerald-400" : "text-orange-400")}>
                                    {/* @ts-ignore */}
                                    {selectedFood.kcal || selectedFood.calories} kcal / 100g
                                </p>
                            </div>
                            <button onClick={() => { setSelectedFood(null); setWeightInput(""); setCaloriesInput(""); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-neutral-400" />
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    placeholder="Poids"
                                    value={weightInput}
                                    onChange={handleWeightChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 text-center font-mono text-lg"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 text-sm font-bold">g</span>
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    placeholder="Calories"
                                    value={caloriesInput}
                                    onChange={handleCaloriesChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-emerald-400 placeholder:text-neutral-600 focus:outline-none focus:border-white/30 text-center font-black text-lg"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 text-xs font-bold uppercase">Kcal</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddLog}
                            disabled={!weightInput || !caloriesInput || addLogMutation.isPending}
                            className="w-full bg-white text-black font-black text-lg py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {addLogMutation.isPending ? "AJOUT..." : "AJOUTER"}
                        </button>
                    </div>
                )}
            </div>

            {imageAnalyzing && (
                <div className="absolute inset-0 bg-black/80 rounded-3xl z-50 flex flex-col items-center justify-center border border-emerald-500/30 backdrop-blur-sm">
                    <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
                    <p className="text-white font-bold animate-pulse">Analyse de l'image en cours...</p>
                    <p className="text-neutral-400 text-sm mt-2 text-center px-4">Cal AI calcule les portions et nutriments</p>
                </div>
            )}
        </div>
    );
}
