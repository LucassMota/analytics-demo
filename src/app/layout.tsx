import React from 'react'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '../providers/ThemeProvider'
import { cookies } from 'next/headers'
import { defaultLocale } from '../i18n/config'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const raw = cookieStore.get('NEXT_LOCALE')?.value
  const locale = raw === 'en' ? 'en-US' : raw || defaultLocale
  const messages = (await import(`../dictionaries/${locale}.json`)).default
  return (
    <html lang={locale} suppressHydrationWarning className="min-h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen antialiased bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-950)] dark:text-[var(--gray-dark-mode-25)] scrollbar-color">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
