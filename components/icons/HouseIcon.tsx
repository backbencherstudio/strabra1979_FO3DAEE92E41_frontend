import { type SVGProps } from 'react'

export const HouseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M13 2 2 7m10-4v19H7c-1.886 0-2.828 0-3.414-.586S3 19.886 3 18V7m9 0 10 5" />
        <path d="M10 22h7c1.886 0 2.828 0 3.414-.586S21 19.885 21 18v-6.5M18 10V7M7 11h1m-1 4h1m8-1h1m-.5 8v-4" />
      </g>
    </svg>
  )
}
