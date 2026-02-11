import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function GlassPanel({ className, children, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-xl p-6 transition-all duration-300 hover:border-white/20",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
