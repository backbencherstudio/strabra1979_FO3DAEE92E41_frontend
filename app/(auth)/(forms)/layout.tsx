import authImgMobile from '@/public/auth/auth-img-mobile.png'
import authImg from '@/public/auth/auth-img.png'
import Image from 'next/image'

export default function AuthFormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        {children}
      </div>
    </div>
  )
}
