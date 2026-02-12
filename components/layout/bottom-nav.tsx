"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Copy, Refrigerator, ChefHat, TrendingUp } from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();

    const items = [
        {
            label: "Journal",
            href: "/dashboard",
            icon: Copy,
            active: pathname === "/dashboard",
        },
        {
            label: "Frigo",
            href: "/dashboard/fridge",
            icon: Refrigerator,
            active: pathname === "/dashboard/fridge",
        },
        {
            label: "Recettes",
            href: "/dashboard/recipes",
            icon: ChefHat,
            active: pathname === "/dashboard/recipes",
        },
        {
            label: "Stats",
            href: "/dashboard/stats",
            icon: TrendingUp,
            active: pathname === "/dashboard/stats",
        },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around p-2 shadow-2xl shadow-black/50 pointer-events-auto">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300",
                            item.active
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <item.icon className={cn("w-6 h-6 mb-1", item.active && "fill-current")} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
