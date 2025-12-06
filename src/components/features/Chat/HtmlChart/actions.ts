'use server'

import { httpNextService } from '@/src/services/http'

export const fetchHtmlChart = async (path: string) => {
  const response = await httpNextService.post(`/html-charts`, { path })
  return response.data
}
