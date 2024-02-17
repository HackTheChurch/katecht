import UserButton from "@/components/auth/user-button";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme/toggle-button";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "😱 WOW",
  description: "Best app for christian education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen w-full min-w-full px-4 py-4 pb-10 sm:px-6 md:max-w-2xl"}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-1 items-center justify-end space-x-2 p-2">
            <ModeToggle />
            <UserButton />
          </div>

          <div className="mx-auto max-w-2xl">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
