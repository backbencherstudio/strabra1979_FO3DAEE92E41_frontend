export * from './role'
export * from './routes'

const day1 = 60 * 60 * 24
export const cookieAge = {
  day1,
  day7: day1 * 7,
  day30: day1 * 30,
}

export const baseApiURL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://fda-outlined-tries-circus.trycloudflare.com/api'
