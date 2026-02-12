import { BottomNav } from "@/components/layout/bottom-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <main className="flex-1 pb-32 pt-6">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
