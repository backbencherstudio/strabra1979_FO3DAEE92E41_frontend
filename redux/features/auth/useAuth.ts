import { useLoginMutation } from '@/api/auth/authApi'
import {
  getErrorMessage,
  handleContactAdminRedirect,
  shouldRedirectToContactAdmin,
} from '@/lib/farmatters'
import { useAppDispatch } from '@/redux/store'
import { ILoginParams } from '@/types'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { clearToken, selectCurrentRole, selectCurrentToken } from './authSlice'

// Validate redirect URL
const isValidRedirect = (url: string) => {
  // Only allow relative paths (starting with /)
  if (!url.startsWith('/')) return false
  // Prevent protocol-relative URLs (//evil.com)
  if (url.startsWith('//')) return false
  return true
}

export function useAuth() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [logInMutatin, ctx] = useLoginMutation()
  const token = useSelector(selectCurrentToken)
  const role = useSelector(selectCurrentRole)

  function logOut() {
    dispatch(clearToken())
  }

  async function logIn(params: ILoginParams) {
    try {
      await logInMutatin(params).unwrap()
      router.replace('/') // proxy.ts will redirect the user in correct path
    } catch (error) {
      const msg = getErrorMessage(
        error,
        'Unable to sign in. Please check your credentials and try again.',
      )

      if (shouldRedirectToContactAdmin(msg)) {
        handleContactAdminRedirect(router)
        return
      }

      toast.error('Sign in failed', { description: msg })
    }
  }

  return {
    token,
    role,
    isAuthenticated: !!token,
    logIn,
    logOut,
    ...ctx,
  }
}
