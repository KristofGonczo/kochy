import { ThemeProvider } from "@/components/provider/theme-provider";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import messages from "../../messages/en.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type TestProvidersProps = {
  children?: ReactNode;
};

export default function TestProviders({ children }: TestProvidersProps) {
  return (
    <div
      className={cn(
        "min-h-full flex flex-col",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </div>
  );
}
