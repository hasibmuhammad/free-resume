import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "./components/Header/Header";
import ReduxProviderWrapper from "./components/ReduxProviderWrapper/ReduxProviderWrapper";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Free Resume Builder",
  description:
    "This is your ultimate no #1 platform for building your resume that really hired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased  flex flex-col min-h-screen
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:'none'] 
          [scrollbar-width:'none']`}
      >
        <ReduxProviderWrapper>
          <Header />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
