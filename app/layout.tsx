import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { GlobalProvider } from "@/context/GlobalContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Онлайн видео сургалт",
  description: "Онлайн видео сургалт",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <GlobalProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={montserrat.className}>
            <div className="flex gap-10">
              <Sidebar />
              {children}
            </div>
            p
          </body>
        </html>
      </GlobalProvider>
    </ClerkProvider>
  );
}
