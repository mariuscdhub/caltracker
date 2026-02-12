import { BottomNav } from "@/components/layout/bottom-nav";
import { BackgroundElements } from "@/components/layout/background-elements";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-hidden relative">
            <BackgroundElements />
            <main className="flex-1 pb-32 pt-6 relative z-10">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
