import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { defaultLocale } from './config'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get('NEXT_LOCALE')?.value
  const locale = raw === 'en' ? 'en-US' : raw || defaultLocale

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default
  }
})
