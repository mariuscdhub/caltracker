import { GlassPanel } from "@/components/ui/glass-panel";

export default function StatsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter mb-6">STATS</h1>

            <GlassPanel className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 border-purple-500/20">
                <h2 className="text-sm font-bold text-purple-400 mb-2">CURRENT STREAK</h2>
                <div className="text-5xl font-black text-white">0 DAYS</div>
            </GlassPanel>

            <GlassPanel>
                <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
                <div className="text-muted-foreground h-64 flex items-center justify-center bg-black/20 rounded-lg">
                    Calendar Placeholder
                </div>
            </GlassPanel>
        </div>
    );
}
