import React from "react";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-full">
      <body className="min-h-screen antialiased bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-950)] dark:text-[var(--gray-dark-mode-25)]">
        <ThemeProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
