import { GlassPanel } from "@/components/ui/glass-panel";

export default function FridgePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter mb-6">MY FRIDGE</h1>

            <GlassPanel className="border-emerald-500/20">
                <h2 className="text-xl font-bold mb-4">Custom Foods</h2>
                <div className="text-muted-foreground">List of custom foods will appear here.</div>
            </GlassPanel>

            <GlassPanel className="border-orange-500/20">
                <h2 className="text-xl font-bold mb-4">Add Food</h2>
                <div className="text-muted-foreground">Form to add new food.</div>
            </GlassPanel>
        </div>
    );
}
