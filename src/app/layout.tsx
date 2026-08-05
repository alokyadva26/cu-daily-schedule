import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CU Daily Schedule",
  description: "Modern daily schedule for your classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen antialiased`}>
        {/* Clean Background */}
        <div className="fixed inset-0 -z-10 bg-background transition-colors duration-300"></div>
        
        {children}
      </body>
    </html>
  );
}
