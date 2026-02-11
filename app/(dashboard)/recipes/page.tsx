import { GlassPanel } from "@/components/ui/glass-panel";

export default function RecipesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter mb-6">MY RECIPES</h1>

            <GlassPanel className="border-blue-500/20">
                <h2 className="text-xl font-bold mb-4">Saved Recipes</h2>
                <div className="text-muted-foreground">List of your recipes.</div>
            </GlassPanel>

            <GlassPanel className="border-blue-500/20">
                <h2 className="text-xl font-bold mb-4">Create Recipe</h2>
                <div className="text-muted-foreground">Recipe builder form.</div>
            </GlassPanel>
        </div>
    );
}
