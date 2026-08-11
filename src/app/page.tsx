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
    <main className="relative min-h-[100dvh] w-full max-w-[100vw] flex flex-col items-center justify-between py-6 px-4 overflow-x-hidden font-sans bg-[#f8f9fa] box-border">
      {/* Authentic CU Campus Background with subtle white translucent overlay */}
      <div className="fixed inset-0 z-0 bg-[#f8f9fa] pointer-events-none">
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
      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-5xl h-full flex-1">
        
        {/* Top Header */}
        <div className="flex flex-col items-center pt-4 md:pt-[min(1rem,2vh)] w-full">
          {/* CU Logo */}
          <div className="mb-4 md:mb-[min(1rem,2vh)]">
            <img 
              src="/cu-logo.png" 
              alt="Chandigarh University Logo" 
              className="h-16 md:h-[min(5rem,8vh)] w-auto object-contain drop-shadow-md"
            />
          </div>
          
          <h1 className="text-[clamp(1.75rem,8vw,3.75rem)] md:text-[clamp(2rem,6vh,3.75rem)] font-black text-[#1a2b4c] tracking-tight mb-2 md:mb-[min(1rem,2vh)] leading-none text-center w-full max-w-full break-words">
            DAILY SCHEDULE
          </h1>
          
          <div className="flex items-center gap-2 md:gap-[min(1rem,2vw)] w-full justify-center max-w-full">
            <div className="h-[1px] w-12 md:w-[min(3rem,4vw)] bg-red-600/60 shrink-0" />
            <h2 className="text-[clamp(0.65rem,3vw,1rem)] md:text-[clamp(0.75rem,1.8vh,1rem)] font-semibold tracking-[0.1em] md:tracking-[0.2em] text-[#4a5568] uppercase text-center whitespace-nowrap overflow-hidden text-ellipsis">
              SMART TIMETABLE DEVICE
            </h2>
            <div className="h-[1px] w-12 md:w-[min(3rem,4vw)] bg-red-600/60 shrink-0" />
          </div>
        </div>

        {/* Main Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 w-full my-8 md:my-[min(1.5rem,3vh)] flex-1 box-border">
          
          {/* Left Card: Student NFC */}
          <Link href="/student" className="group flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[2rem] md:rounded-[min(2rem,4vh)] py-8 px-6 md:p-[min(2.5rem,4vh)] w-full max-w-[420px] md:max-w-[min(24rem,38vh)] md:aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:translate-y-0 active:shadow-md cursor-pointer box-border mx-auto md:mx-0">
            <div className="w-20 h-20 md:w-[min(6rem,12vh)] md:h-[min(6rem,12vh)] rounded-full border border-slate-200 flex items-center justify-center mb-6 md:mb-[min(1.5rem,3vh)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PremiumNfcIcon className="w-10 h-10 md:w-[min(3.5rem,7vh)] md:h-[min(3.5rem,7vh)] text-[#1a2b4c]" strokeWidth={1.5} />
            </div>
            
            <div className="h-[2px] w-12 md:w-[min(3rem,5vh)] bg-red-600/40 mb-6 md:mb-[min(1.5rem,3vh)] group-hover:w-16 md:group-hover:w-[min(4.5rem,7vh)] transition-all duration-300 shrink-0" />
            
            <h3 className="text-lg md:text-[clamp(1.125rem,2.2vh,1.5rem)] font-bold text-[#1a2b4c] mb-2 md:mb-[min(0.5rem,1vh)] text-center leading-tight">
              TAP YOUR NFC CARD
            </h3>
            <p className="text-sm md:text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium text-center">
              to view your timetable
            </p>
          </Link>

          {/* Right Card: Teacher QR */}
          <Link href="/teacher" className="group flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[2rem] md:rounded-[min(2rem,4vh)] py-8 px-6 md:p-[min(2.5rem,4vh)] w-full max-w-[420px] md:max-w-[min(24rem,38vh)] md:aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:translate-y-0 active:shadow-md cursor-pointer box-border mx-auto md:mx-0">
            <div className="w-20 h-20 md:w-[min(6rem,12vh)] md:h-[min(6rem,12vh)] rounded-full border border-slate-200 flex items-center justify-center mb-6 md:mb-[min(1.5rem,3vh)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PremiumQrIcon className="w-10 h-10 md:w-[min(3.5rem,7vh)] md:h-[min(3.5rem,7vh)] text-[#1a2b4c]" strokeWidth={1.5} />
            </div>
            
            <div className="h-[2px] w-12 md:w-[min(3rem,5vh)] bg-red-600/40 mb-6 md:mb-[min(1.5rem,3vh)] group-hover:w-16 md:group-hover:w-[min(4.5rem,7vh)] transition-all duration-300 shrink-0" />
            
            <h3 className="text-lg md:text-[clamp(1.125rem,2.2vh,1.5rem)] font-bold text-[#1a2b4c] mb-2 md:mb-[min(0.5rem,1vh)] text-center leading-tight">
              SCAN TEACHER QR CODE
            </h3>
            <p className="text-sm md:text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium text-center">
              to view teacher timetable
            </p>
          </Link>
        </div>

        {/* Bottom Status */}
        <div className="flex flex-col items-center pb-4 md:pb-[min(1rem,2vh)] mt-4 md:mt-auto">
          <h3 className="text-base md:text-[clamp(1rem,2vh,1.125rem)] font-bold text-[#1a2b4c] mb-1 text-center">
            DEVICE READY
          </h3>
          <p className="text-sm md:text-[clamp(0.875rem,1.8vh,1rem)] text-slate-500 font-medium mb-3 md:mb-[min(0.75rem,1.5vh)] text-center max-w-[280px] md:max-w-none mx-auto">
            Please tap your NFC card or scan QR code
          </p>
          <div className="h-[3px] w-12 md:w-[min(3rem,4vw)] bg-red-600 rounded-full" />
        </div>
        
      </div>
    </main>
  );
}
