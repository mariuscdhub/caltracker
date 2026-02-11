"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, IceCream, ChefHat, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
    { href: "/dashboard", label: "Tracker", icon: Home },
    { href: "/dashboard/fridge", label: "Frigo", icon: IceCream },
    { href: "/dashboard/recipes", label: "Recettes", icon: ChefHat },
    { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe">
            <div className="flex justify-around items-center h-16">
                {items.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <Icon className={cn("w-6 h-6 mb-1", isActive && "fill-current/20")} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
