import { BottomNav } from "@/components/layout/bottom-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 pb-24 pt-6">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
