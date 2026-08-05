import { Clock, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BottomCard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const lastUpdatedTime = format(new Date(), "h:mm:ss a");

  return (
    <div className="cuims-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
      <div className="flex items-start sm:items-center gap-4">
        <div className="bg-accent/10 p-2.5 rounded-full shrink-0">
          <Clock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-foreground font-semibold text-sm">Schedule updates automatically</p>
          <p className="text-secondary text-xs mt-0.5">Last updated: <span className="font-bold text-foreground">{lastUpdatedTime}</span></p>
        </div>
      </div>
      
      <button 
        onClick={handleRefresh}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-card-border hover:border-accent text-accent font-semibold text-sm transition-all duration-300 hover:bg-accent/5 active:scale-95"
      >
        <RefreshCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
        Refresh
      </button>
    </div>
  );
}
