import { useCallback, useState } from 'react'

type CopyStatus = 'idle' | 'success' | 'error'

export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>('idle')
  

  const copy = useCallback(async (text: string) => {
    if (!text) return false

    try {
      // Modern async clipboard API (preferred)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setStatus('success')
        return true
      }

      // Fallback for older browsers / non-HTTPS
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      textarea.style.left = '-9999px'

      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()

      const success = document.execCommand('copy')
      document.body.removeChild(textarea)

      setStatus(success ? 'success' : 'error')
      return success
    } catch (err) {
      console.error('Copy failed:', err)
      setStatus('error')
      return false
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
  }, [])

  return {
    copy,
    status,
    reset,
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
