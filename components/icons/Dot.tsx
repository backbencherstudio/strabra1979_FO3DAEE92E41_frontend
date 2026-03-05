import { SVGProps } from 'react'

export const Dot = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="3"
      height="15"
      viewBox="0 0 3 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.25762 7.25H1.2666"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.24981 13.25H1.25879"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.26543 1.25H1.27441"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
