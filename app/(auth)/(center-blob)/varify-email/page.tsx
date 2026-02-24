import OTPForm from '@/components/auth/OTPForm'
import authLogo from '@/public/auth/auth-logo.png'
import Image from 'next/image'

export default function page() {
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
        <p className="mt-2 text-center">
          We have just sent you 4 digit code your email bram*******@gmail.com
        </p>

        <div className="mt-4 w-full">
          <OTPForm />
        </div>
      </div>
    </div>
  )
}
