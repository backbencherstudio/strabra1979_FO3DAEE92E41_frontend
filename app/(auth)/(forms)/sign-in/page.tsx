import SignInForm from '@/components/auth/SignInForm'
import authLogo from '@/public/auth/auth-logo.png'
import Image from 'next/image'

export default function AuthPage() {
  return (
    <div className="mx-4 flex flex-1 flex-col items-center justify-center rounded-3xl bg-[#f8f6f3] px-4 py-8 md:mx-6 md:px-12 xl:mx-0">
      <Image
        src={authLogo}
        alt="auth Logo"
        className="h-16 w-16 mix-blend-multiply sm:h-20 sm:w-20 md:h-24 md:w-24"
      />

      <h2 className="mt-4 text-center text-xl font-semibold sm:mt-6 sm:text-2xl md:text-3xl">
        Hey! Welcome back
      </h2>

      <p className="mt-1 text-center text-sm text-[#777980] sm:mt-2 sm:text-base">
        Login to your Account
      </p>

      <div className="mt-4 w-full sm:mt-6">
        <SignInForm />
      </div>
    </div>
  )
}
