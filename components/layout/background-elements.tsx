"use client";

import { useEffect, useState } from "react";

export function BackgroundElements() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className="bg-grid" />
            <div className="flare-emerald" />
            <div className="flare-orange" />
            <div className="waveform-bg flex justify-center items-end gap-3 px-4">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="wave-line"
                        style={{
                            height: `${Math.random() * 40 + 10}%`,
                            left: `${i * 3.3}%`,
                            animation: `wave ${4 + Math.random() * 6}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * -5}s`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
