import { PartyPopper } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] glass rounded-3xl p-12 text-center shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-accent/10 p-6 rounded-full mb-6">
        <PartyPopper className="w-20 h-20 text-accent" />
      </div>
      <h2 className="text-4xl font-extrabold mb-4 tracking-tight">🎉 No Classes Today!</h2>
      <p className="text-xl text-foreground/70 max-w-md mx-auto">
        Enjoy your day off! Relax, recharge, or catch up on some personal projects.
      </p>
    </div>
  );
}
