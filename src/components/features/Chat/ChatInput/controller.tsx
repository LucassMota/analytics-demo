'use client'

import { useCallback, useMemo, useState } from 'react'
import { sendSynchrounousMessage } from './actions'
import { useChat } from '../controller'

export type ChatInputControllerProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSend?: (message: string) => void
  disabled?: boolean
}

export const useChatInput = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSend,
  disabled = false
}: ChatInputControllerProps = {}) => {
  const { setUserMessage, setAgentMessage } = useChat()

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  const canSend = value.trim().length > 0 && !disabled

  const handleSend = useCallback(async () => {
    if (!canSend) return

    setUserMessage(value)
    if (!isControlled) setUncontrolledValue('')
    setAgentMessage({ content: 'thinking...' })
    const agentResponse = await sendSynchrounousMessage(value)
    console.log(agentResponse)
    setAgentMessage(agentResponse)
  }, [canSend, onSend, value, isControlled, setUserMessage, setAgentMessage])

  const textareaProps = useMemo(
    () => ({
      value,
      disabled,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          if (e.nativeEvent.isComposing || e.repeat) return
          e.preventDefault()
          handleSend()
        }
      }
    }),
    [value, disabled, setValue, handleSend]
  )

  const sendButtonProps = useMemo(
    () => ({
      onClick: handleSend,
      disabled: !canSend
    }),
    [handleSend, canSend]
  )

  return {
    value,
    disabled,
    canSend,
    setValue,
    handleSend,
    textareaProps,
    sendButtonProps
  }
}

export default useChatInput
