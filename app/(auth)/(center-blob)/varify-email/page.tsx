import OTPForm from '@/components/auth/OTPForm'
import { config, routes } from '@/constant'
import { maskEmail } from '@/lib/utils'
import authLogo from '@/public/auth/auth-logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const email = params.email

  const maskedEmail = email ? maskEmail(email) : null

  return (
    <div className="w-full max-w-2xl px-4">
      <div className="flex flex-col items-center rounded-[24px] border border-[#EDE9DF] bg-[#F8F6F3] p-6 md:p-12">
        <Image
          src={authLogo}
          alt="auth Logo"
          className="h-16 w-16 mix-blend-multiply sm:h-20 sm:w-20 md:h-24 md:w-24"
        />

        <h1 className="text-gray-black-500 mt-4 text-center text-lg font-semibold md:text-2xl">
          Enter OTP
        </h1>

        <p className="text-muted-foreground mt-2 text-center">
          {email ? (
            <>
              <span className="text-sm">
                We have just sent you {config.otpDiginLenght} digit code to your email{' '}
              </span>
              <span className="text-foreground font-medium">{maskedEmail}</span>
            </>
          ) : (
            <>
              We couldn’t find your email. Please{' '}
              <Link
                className="font-medium text-[#0b2a3b] underline hover:underline"
                href={routes.forgotPassword}
              >
                Request a new code
              </Link>
            </>
          )}
        </p>

        <div className="mt-4 w-full">
          <OTPForm />
        </div>
      </div>
    </div>
  )
}
