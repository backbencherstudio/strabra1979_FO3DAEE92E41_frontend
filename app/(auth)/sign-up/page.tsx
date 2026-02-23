import { AccountTypeTabs } from '@/components/auth/AccountTypeTabs'
import authImgMobile from '@/public/auth/auth-img-mobile.png'
import authImg from '@/public/auth/auth-img.png'
import authLogo from '@/public/auth/auth-logo.png'
import Image from 'next/image'

export default function AuthPage() {
  return (
    <div className="pb-6 xl:h-svh xl:p-6">
      <div className="mx-auto grid h-full grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        {/* Left Section - Image */}
        <div className="relative h-full w-full">
          <Image
            fill
            src={authImg}
            alt="auth Image"
            className="hidden h-full w-full rounded-[24px] object-cover object-bottom xl:block"
            priority
          />

          <Image
            src={authImgMobile}
            alt="auth Image"
            className="h-full w-full rounded-b-3xl object-cover object-bottom xl:hidden"
            priority
          />
        </div>

        {/* Right Section - Form */}
        <div className="mx-4 flex flex-1 flex-col items-center justify-center rounded-3xl bg-[#f8f6f3] px-4 py-8 md:mx-6 xl:mx-0">
          <Image
            src={authLogo}
            alt="auth Logo"
            className="h-16 w-16 mix-blend-multiply sm:h-20 sm:w-20 md:h-24 md:w-24"
          />

          <h2 className="mt-4 text-center text-xl font-semibold sm:mt-6 sm:text-2xl md:text-3xl">
            Create your Account
          </h2>

          <p className="mt-1 text-center text-sm text-[#777980] sm:mt-2 sm:text-base">
            Choose your account type
          </p>

          <div className="mt-4 w-full sm:mt-6">
            <AccountTypeTabs />
          </div>
        </div>
      </div>
    </div>
  )
}
