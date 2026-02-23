import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TeamProvider } from "@/contexts/team-context";
import { ActiveUserProvider } from "@/contexts/active-user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Switcher",
  description: "A modern team management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <TeamProvider>
            <ActiveUserProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </ActiveUserProvider>
          </TeamProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
