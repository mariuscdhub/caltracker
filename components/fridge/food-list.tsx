
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFoods, deleteFood } from "@/lib/actions";
import { Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Food } from "@/lib/types";
import { INITIAL_FOODS, type StaticFood } from "@/lib/data/initial-foods";
import { useState } from "react";

export function FoodList() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data: foods = [], isLoading } = useQuery<Food[]>({
        queryKey: ['foods', 'all'], // 'all' to differentiate from search
        queryFn: () => getFoods("") as Promise<Food[]>,
        enabled: !!user,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteFood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foods'] });
        },
    });

    const allFoods = [...INITIAL_FOODS, ...foods];
    const filteredFoods = allFoods.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="text-center text-neutral-600 py-10">Chargement...</div>;

    return (
        <div className="space-y-6 pb-32">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Rechercher un aliment dans le frigo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 focus:bg-black/70 transition-all"
                />
            </div>

            {filteredFoods.length === 0 ? (
                <div className="text-center text-neutral-600 py-10">Aucun aliment trouvé.</div>
            ) : (
                <div className="space-y-3">
                    {filteredFoods.map((food) => {
                        const isCustom = typeof food.id === "string";
                        // @ts-ignore
                        const calories = food.kcal || food.calories;

                        return (
                            <div key={food.id} className="glass-panel p-4 rounded-xl flex justify-between items-center group">
                                <div>
                                    <h4 className="font-bold text-white">{food.name}</h4>
                                    <div className="flex gap-2 text-xs text-neutral-400 mt-1 items-center">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded uppercase font-bold",
                                            food.type === 'cru' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                                        )}>
                                            {food.type}
                                        </span>
                                        <span className="text-white/60 font-mono">{calories} kcal / 100g</span>
                                        <span className="text-blue-400 font-mono">{food.protein}g Prot</span>
                                        {!isCustom && (
                                            <span className="px-1.5 py-0.5 bg-white/10 text-white/50 rounded uppercase text-[10px] tracking-wider ml-2">Base</span>
                                        )}
                                    </div>
                                </div>
                                {isCustom && (
                                    <button
                                        onClick={() => deleteMutation.mutate(food.id as string)}
                                        disabled={deleteMutation.isPending}
                                        className="text-neutral-600 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
