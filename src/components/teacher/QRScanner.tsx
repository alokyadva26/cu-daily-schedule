'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X } from 'lucide-react';
import { parseEmployeeIdFromQr } from '@/lib/teacherSchedule';
import { useRouter } from 'next/navigation';

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const router = useRouter();

  // Handle scanner initialization and cleanup based on the isScanning state
  useEffect(() => {
    let mounted = true;

    if (isScanning) {
      // The div is now guaranteed to be mounted by React
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (scannerRef.current && scannerRef.current.isScanning) {
            // Stop scanner on success before navigating
            scannerRef.current.stop().then(() => {
              if (mounted) {
                scannerRef.current = null;
                setIsScanning(false);
                const employeeId = parseEmployeeIdFromQr(decodedText);
                router.push(`/teacher/${employeeId}`);
              }
            }).catch(console.error);
          }
        },
        (errorMessage) => {
          // ignore scan errors, it throws them on every frame it doesn't detect a QR
        }
      ).catch((err) => {
        console.error("Camera start error:", err);
        if (mounted) {
          setError("Failed to access camera. Please ensure permissions are granted.");
          setIsScanning(false);
          scannerRef.current = null;
        }
      });
    }

    return () => {
      mounted = false;
      // Cleanup: stop scanner if it's running when component unmounts or isScanning becomes false
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning, router]);

  const startScanner = () => {
    setError(null);
    setIsScanning(true); // Triggers the useEffect
  };

  const stopScanner = () => {
    setIsScanning(false); // Triggers the useEffect cleanup
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      {!isScanning ? (
        <button
          onClick={startScanner}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-[12px] font-bold hover:bg-accent/90 transition-colors w-full justify-center shadow-md border border-accent/20"
        >
          <Camera className="w-5 h-5" />
          Scan Employee QR
        </button>
      ) : (
        <div className="w-full max-w-sm relative mt-8">
          <div className="absolute -top-12 left-0 right-0 flex justify-between items-center z-10 bg-background/80 backdrop-blur-md px-4 py-2 rounded-xl">
            <span className="font-bold text-foreground">Scan QR Code</span>
            <button onClick={stopScanner} className="p-1.5 bg-background rounded-full shadow-sm text-foreground hover:bg-timeline transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div id="reader" className="w-full rounded-2xl overflow-hidden shadow-lg bg-black min-h-[250px]"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-3 text-center bg-red-50 p-2 rounded-lg">{error}</p>}
    </div>
  );
}
