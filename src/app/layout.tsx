import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReduxProviderWrapper from "./components/ReduxProviderWrapper/ReduxProviderWrapper";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { defaultMetadata } from "@/lib/seo";
import { ResumePreviewFonts } from "./components/ResumePreviewFonts/ResumePreviewFonts";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = defaultMetadata;

const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('freeresume-theme');
      var theme = stored === 'dark' || stored === 'light'
        ? stored
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ResumePreviewFonts />
      </head>
      <body
        className={`${plusJakarta.variable} flex min-h-dvh flex-col bg-surface-muted font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <ReduxProviderWrapper>
          <ThemeProvider>
            <Header />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            <Footer />
          </ThemeProvider>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
