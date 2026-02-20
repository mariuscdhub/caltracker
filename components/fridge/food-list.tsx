
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFoods, deleteFood } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Food } from "@/lib/types";

export function FoodList() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

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

    if (isLoading) return <div className="text-center text-neutral-600 py-10">Chargement...</div>;

    if (foods.length === 0) {
        return <div className="text-center text-neutral-600 py-10">Aucun aliment personnalisé. Créez-en un !</div>;
    }

    return (
        <div className="space-y-3 pb-32">
            {foods.map((food) => (
                <div key={food.id} className="glass-panel p-4 rounded-xl flex justify-between items-center group">
                    <div>
                        <h4 className="font-bold text-white">{food.name}</h4>
                        <div className="flex gap-2 text-xs text-neutral-400 mt-1">
                            <span className={cn(
                                "px-2 py-0.5 rounded uppercase font-bold",
                                food.type === 'cru' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                            )}>
                                {food.type}
                            </span>
                            <span>{food.calories} kcal</span>
                            <span className="text-blue-400">{food.protein}g Prot</span>
                        </div>
                    </div>
                    <button
                        onClick={() => deleteMutation.mutate(food.id)}
                        disabled={deleteMutation.isPending}
                        className="text-neutral-600 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
}
