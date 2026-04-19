import { useLoginMutation } from '@/api/auth/authApi'
import { getErrorMessage } from '@/lib/farmatters'
import { useAppDispatch } from '@/redux/store'
import { ILoginParams } from '@/types'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { invalidToken, clearToken, selectCurrentRole, selectCurrentToken } from './authSlice'

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
      toast.error(getErrorMessage(error, 'Failed to SignIn. Please try again.'))
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
