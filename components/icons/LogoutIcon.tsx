import { type SVGProps } from 'react'

export const LogoutIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path d="M20 23.5c-.098 2.47-2.156 4.566-4.912 4.498-.642-.015-1.434-.239-3.02-.686-3.815-1.076-7.127-2.885-7.922-6.937C4 19.631 4 18.793 4 17.116v-2.232c0-1.677 0-2.515.146-3.26.795-4.051 4.107-5.86 7.922-6.936 1.585-.447 2.378-.67 3.02-.686C17.844 3.934 19.902 6.03 20 8.5" />
        <path
          d="M27.999 16.001H13.332m14.667 0c0-.933-2.66-2.678-3.334-3.333M28 16.001c0 .934-2.66 2.678-3.334 3.334"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
