import React from 'react'
import Image from 'next/image'
import authImg from '@/public/auth/auth-img.png'
import authLogo from '@/public/auth/auth-logo.png'
import { AccountTypeTabs } from '@/components/auth/AccountTypeTabs'

export default function AuthPage() {
  return (
    <div className='min-h-screen p-4 sm:p-6 flex items-center'>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-[1390px] mx-auto w-full h-full'>
        
        {/* Left Section - Image */}
        <div className='flex-1 h-[300px] sm:h-[400px] lg:h-auto'>
          <Image 
            src={authImg} 
            alt='auth Image'   
            className='w-full h-full object-cover rounded-[16px] sm:rounded-[24px]'
            priority
          />
        </div>

        {/* Right Section - Form */}
        <div className='flex-1 bg-[#f8f6f3] rounded-[16px] sm:rounded-[24px] 
          py-8 sm:py-12 lg:py-29.75 
          px-4 sm:px-6 md:px-8 lg:px-12 
          flex flex-col items-center justify-center
          h-[300px] sm:h-[400px] lg:h-auto'>
          
          <Image 
            src={authLogo} 
            alt='auth Logo' 
            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
          />
          
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mt-4 sm:mt-6 text-center'>
            Create your Account
          </h2>
          
          <p className='text-[#777980] text-sm sm:text-base mt-1 sm:mt-2 text-center'>
            Choose your account type
          </p>
          
          <div className='w-full mt-4 sm:mt-6'>
            <AccountTypeTabs />
          </div>
        </div>
      </div>
    </div>
  )
}