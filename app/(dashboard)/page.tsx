import { GlassPanel } from "@/components/ui/glass-panel";

export default function TrackerPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-white tracking-tighter">TODAY</h1>
            </header>

            {/* Goal Card Placeholder */}
            <GlassPanel className="bg-gradient-to-br from-emerald-500/10 to-emerald-900/10 border-emerald-500/20">
                <h2 className="text-sm font-bold text-emerald-400 mb-2">CALORIES REMAINING</h2>
                <div className="text-5xl font-black text-white">2500</div>
            </GlassPanel>

            {/* Input Area Placeholder */}
            <GlassPanel>
                <p className="text-muted-foreground text-center py-8">Tracker Input Area</p>
            </GlassPanel>

            {/* Daily Log Placeholder */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground">LOGS</h3>
                <GlassPanel className="flex justify-between items-center">
                    <span>Breakfast</span>
                    <span>500 kcal</span>
                </GlassPanel>
            </div>
        </div>
    );
}
