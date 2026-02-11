import { GlassPanel } from "@/components/ui/glass-panel";
import { ArrowRight, Flame, Scale, Server, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">CALTRACKER</div>
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-white transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            UNLOCK YOUR <br /> NUTRITION FLOW
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The first calorie tracker optimized for raw vs cooked foods.
            Sync your fridge, master your macros, own your body.
          </p>
          <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              href="/sign-up"
              className="group bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase text-center mb-12">
            The Problem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassPanel className="border-destructive/20 hover:border-destructive/40">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">Imprecise Tracking</h3>
              <p className="text-muted-foreground">
                Raw 100g ≠ Cooked 100g. Most apps ignore this, leading to
                massive calorie estimation errors.
              </p>
            </GlassPanel>
            <GlassPanel className="border-destructive/20 hover:border-destructive/40">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complex Workflows</h3>
              <p className="text-muted-foreground">
                Endless searching for the same foods. We optimize for speed
                with your personal fridge database.
              </p>
            </GlassPanel>
            <GlassPanel className="border-destructive/20 hover:border-destructive/40">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data Loss</h3>
              <p className="text-muted-foreground">
                Local-only apps lose your history. We sync everything to the
                cloud in real-time.
              </p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassPanel className="hover:border-primary/50">
              <div className="text-emerald-400 font-bold mb-2">RAW / COOKED</div>
              <h3 className="text-lg font-bold mb-2">Smart Conversion</h3>
              <p className="text-sm text-muted-foreground">
                Toggle between raw and cooked weight instantly. Auto-calculation based on density.
              </p>
            </GlassPanel>
            <GlassPanel className="hover:border-primary/50">
              <div className="text-orange-400 font-bold mb-2">FRIDGE</div>
              <h3 className="text-lg font-bold mb-2">Personal DB</h3>
              <p className="text-sm text-muted-foreground">
                Build your own database of foods you actually eat. No more searching generic lists.
              </p>
            </GlassPanel>
            <GlassPanel className="hover:border-primary/50">
              <div className="text-blue-400 font-bold mb-2">RECIPES</div>
              <h3 className="text-lg font-bold mb-2">Batch Cooking</h3>
              <p className="text-sm text-muted-foreground">
                Create complex recipes once, log them as single items. Perfect for meal prep.
              </p>
            </GlassPanel>
            <GlassPanel className="hover:border-primary/50">
              <div className="text-white font-bold mb-2">CLOUD</div>
              <h3 className="text-lg font-bold mb-2">Sync Anywhere</h3>
              <p className="text-sm text-muted-foreground">
                Real-time syncing across all your devices via our secure cloud infrastructure.
              </p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-sm text-muted-foreground">
        <p>© 2026 CalTracker. Built for performance.</p>
      </footer>
    </div>
  );
}
