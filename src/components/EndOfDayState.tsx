import { PartyPopper, ArrowRight } from "lucide-react";

interface EndOfDayStateProps {
  onViewTomorrow: () => void;
}

export function EndOfDayState({ onViewTomorrow }: EndOfDayStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-3xl p-10 text-center shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-emerald-500/10 p-6 rounded-full mb-6">
        <PartyPopper className="w-16 h-16 text-emerald-500" />
      </div>
      <h2 className="text-3xl font-extrabold mb-3 tracking-tight">🎉 Classes are Over!</h2>
      <p className="text-lg text-foreground/70 max-w-sm mx-auto mb-8">
        Have a great evening. <br />
        See you tomorrow.
      </p>
      <button 
        onClick={onViewTomorrow}
        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg"
      >
        View Tomorrow's Schedule
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
