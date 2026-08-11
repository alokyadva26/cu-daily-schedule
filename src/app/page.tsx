'use client';

import Link from 'next/link';

const PremiumNfcIcon = ({ className, strokeWidth = 1.75 }: { className?: string, strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* NFC Card */}
    <rect x="3" y="6" width="11" height="12" rx="2.5" />
    {/* Subtle Card Stripe */}
    <path d="M3 10.5h11" strokeOpacity="0.4" />
    
    {/* Contactless Waves */}
    <path d="M17 9.5a2.5 2.5 0 0 1 0 5" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

const PremiumQrIcon = ({ className, strokeWidth = 1.75 }: { className?: string, strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Outer Scanner Brackets */}
    <path d="M5 9V6a2 2 0 0 1 2-2h2" />
    <path d="M15 4h2a2 2 0 0 1 2 2v3" />
    <path d="M5 15v3a2 2 0 0 0 2 2h2" />
    <path d="M15 20h2a2 2 0 0 0 2-2v-3" />
    
    {/* Stylized Minimal QR Pattern */}
    <rect x="9" y="9" width="2" height="2" rx="0.5" />
    <rect x="13" y="9" width="2" height="2" rx="0.5" />
    <rect x="9" y="13" width="2" height="2" rx="0.5" />
    <rect x="13" y="13" width="2" height="2" rx="0.5" />
    
    {/* Subtle Scan Line */}
    <line x1="3" y1="12" x2="21" y2="12" strokeOpacity="0.4" strokeDasharray="3 3" />
  </svg>
);

export default function LandingPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-between py-8 px-4 overflow-hidden overscroll-none font-sans bg-[#f8f9fa] z-50">
      {/* Authentic CU Campus Background with subtle white translucent overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#f8f9fa]">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'url("/cu-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-5xl h-full flex-1 min-h-0 py-[min(1rem,2vh)]">
        
        {/* Top Header */}
        <div className="flex flex-col items-center pt-[min(1rem,2vh)]">
          {/* CU Logo */}
          <div className="mb-[min(1rem,2vh)]">
            <img 
              src="/cu-logo.png" 
              alt="Chandigarh University Logo" 
              className="h-[min(5rem,8vh)] w-auto object-contain drop-shadow-md"
            />
          </div>
          
          <h1 className="text-[clamp(2rem,6vh,3.75rem)] font-black text-[#1a2b4c] tracking-tight mb-[min(1rem,2vh)] leading-none">
            DAILY SCHEDULE
          </h1>
          
          <div className="flex items-center gap-[min(1rem,2vw)]">
            <div className="h-[1px] w-[min(3rem,4vw)] bg-red-600/60" />
            <h2 className="text-[clamp(0.75rem,1.8vh,1rem)] font-semibold tracking-[0.2em] text-[#4a5568] uppercase">
              SMART TIMETABLE DEVICE
            </h2>
            <div className="h-[1px] w-[min(3rem,4vw)] bg-red-600/60" />
          </div>
        </div>

        {/* Main Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-[min(2rem,4vw)] w-full my-[min(1.5rem,3vh)] min-h-0 flex-1">
          
          {/* Left Card: Student NFC */}
          <Link href="/student" className="group flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[min(2rem,4vh)] p-[min(2.5rem,4vh)] w-full max-w-[min(24rem,38vh)] aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:translate-y-0 active:shadow-md cursor-pointer">
            <div className="w-[min(6rem,12vh)] h-[min(6rem,12vh)] rounded-full border border-slate-200 flex items-center justify-center mb-[min(1.5rem,3vh)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PremiumNfcIcon className="w-[min(3.5rem,7vh)] h-[min(3.5rem,7vh)] text-[#1a2b4c]" strokeWidth={1.5} />
            </div>
            
            <div className="h-[2px] w-[min(3rem,5vh)] bg-red-600/40 mb-[min(1.5rem,3vh)] group-hover:w-[min(4.5rem,7vh)] transition-all duration-300 shrink-0" />
            
            <h3 className="text-[clamp(1.125rem,2.2vh,1.5rem)] font-bold text-[#1a2b4c] mb-[min(0.5rem,1vh)] text-center leading-tight">
              TAP YOUR NFC CARD
            </h3>
            <p className="text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium text-center">
              to view your timetable
            </p>
          </Link>

          {/* Right Card: Teacher QR */}
          <Link href="/teacher" className="group flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[min(2rem,4vh)] p-[min(2.5rem,4vh)] w-full max-w-[min(24rem,38vh)] aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:translate-y-0 active:shadow-md cursor-pointer">
            <div className="w-[min(6rem,12vh)] h-[min(6rem,12vh)] rounded-full border border-slate-200 flex items-center justify-center mb-[min(1.5rem,3vh)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PremiumQrIcon className="w-[min(3.5rem,7vh)] h-[min(3.5rem,7vh)] text-[#1a2b4c]" strokeWidth={1.5} />
            </div>
            
            <div className="h-[2px] w-[min(3rem,5vh)] bg-red-600/40 mb-[min(1.5rem,3vh)] group-hover:w-[min(4.5rem,7vh)] transition-all duration-300 shrink-0" />
            
            <h3 className="text-[clamp(1.125rem,2.2vh,1.5rem)] font-bold text-[#1a2b4c] mb-[min(0.5rem,1vh)] text-center leading-tight">
              SCAN TEACHER QR CODE
            </h3>
            <p className="text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium text-center">
              to view teacher timetable
            </p>
          </Link>
        </div>

        {/* Bottom Status */}
        <div className="flex flex-col items-center pb-[min(1rem,2vh)] mt-auto">
          <h3 className="text-[clamp(1rem,2vh,1.125rem)] font-bold text-[#1a2b4c] mb-1">
            DEVICE READY
          </h3>
          <p className="text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium mb-[min(0.75rem,1.5vh)]">
            Please tap your NFC card or scan QR code
          </p>
          <div className="h-[3px] w-[min(3rem,4vw)] bg-red-600 rounded-full" />
        </div>
        
      </div>
    </main>
  );
}
