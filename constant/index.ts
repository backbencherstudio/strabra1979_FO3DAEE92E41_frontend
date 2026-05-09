export * from './role'
export * from './routes'

const day1 = 60 * 60 * 24
export const cookieAge = {
  day1,
  day7: day1 * 7,
  day30: day1 * 30,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL
const ADMIN_CONTACT_EMAIL = process.env.NEXT_PUBLIC_ADMIN_CONTACT_EMAIL
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined')
if (!SOCKET_URL) throw new Error('NEXT_PUBLIC_SOCKET_URL is not defined')
if (!ADMIN_CONTACT_EMAIL) throw new Error('NEXT_PUBLIC_ADMIN_CONTACT_EMAIL is not defined')

export const config = {
  otpDiginLenght: 6,
  apiBaseUrl: API_URL,
  socketUrl: SOCKET_URL,
  adminContactEmail: ADMIN_CONTACT_EMAIL,
}
