import React from 'react'
import Image from 'next/image'
import shape from '../../../public/auth/round-shape.png'

export default function page() {
  return (
    <div className=' bg-[]'>
        <Image src={shape} alt="round shape" className="w-full h-full object-cover" />
    </div>
  )
}
