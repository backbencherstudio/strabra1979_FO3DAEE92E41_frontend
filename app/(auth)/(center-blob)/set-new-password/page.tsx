import SetNewPasswordForm from '@/components/auth/SetNewPasswordForm'
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
          Set New Password
        </h1>
        <p className="tex-sm text-muted-foreground mt-2 text-center">
          Make sure it’s strong and unique to keep your account secure.
        </p>

        <div className="mt-4 w-full">
          <SetNewPasswordForm />
        </div>
      </div>
    </div>
  )
}
