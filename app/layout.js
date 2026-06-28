import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { IncidentProvider } from "@/lib/incident-context";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "WindCover AI – AI-Powered Crisis Intelligence & Recovery Platform",
  description: "Six autonomous AI investigators reconstruct what happened, analyze root causes, and build recovery intelligence playbooks in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plexMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-gray-100 font-sans">
        <IncidentProvider>
          {children}
        </IncidentProvider>
      </body>
    </html>
  );
}
