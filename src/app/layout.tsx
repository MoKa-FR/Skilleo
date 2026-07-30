import type { Metadata } from "next";
import "./globals.css";
import { themeInitScript } from "@/lib/state/theme-script";
import { Chrome } from "./Chrome";

export const metadata: Metadata = {
  title: "Skilleo",
  description: "Formation pratique à l'intelligence artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <head>
        {/* D-35 : lu avant la peinture pour éviter un flash de thème */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Chrome />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
