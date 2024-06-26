import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analisador de Faturas",
  description: "Analisador de faturas de energia elétrica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TooltipProvider>
          <Navigation />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
