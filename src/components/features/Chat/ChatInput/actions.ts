import { httpService } from '@/src/services/http'
import { ChatPayload } from '../types'
import {
  AGENT_VERSION,
  MODEL_QWEN,
  OLLAMA_API_URL
} from '@/src/ai-models/constants'

export const sendSynchrounousMessage = async (message: string) => {
  try {
    const payload: ChatPayload = {
      message,
      session_id: '',
      agent_version: AGENT_VERSION,
      model: MODEL_QWEN,
      api_url: OLLAMA_API_URL,
      modality: 'auto',
      enable_filter: false,
      persona: 'Default',
      bm25_count: 3,
      rerank_count: 3,
      mcp_sse_url: 'http://localhost:8811/sse',
      stream_thinking: false
    }
    const response = await httpService.post('/chat', payload)
    return response.data
  } catch (error) {
    throw error
  }
}
