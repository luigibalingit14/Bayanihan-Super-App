import type { Metadata } from "next";
import "./globals.css";
import ResponsiveNav from "@/components/nav/ResponsiveNav";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Bayanihan Super App — InterCICSkwela Hackathon 2026",
  description:
    "A unified citizen super app addressing Smart Mobility, Digital Literacy, Good Governance, Employment, Healthcare, and Sustainable Agriculture for Filipino communities.",
  keywords: ["Philippines", "civic tech", "super app", "bayanihan", "hackathon"],
  authors: [{ name: "Luigi Balingit" }],
  openGraph: {
    title: "Bayanihan Super App",
    description: "One app. Six missions. Serving every Filipino.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ResponsiveNav />
          {/* Offset for sidebar on desktop, bottom nav on mobile */}
          <main className="md:ml-20 lg:ml-56 pb-20 md:pb-0 min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
