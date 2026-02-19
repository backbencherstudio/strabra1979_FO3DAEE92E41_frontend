import { type SVGProps } from 'react'

export const SortingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M9.166 6.667h6.667M9.166 10h4.167m-4.167 3.333h2.5m-2.5-10h8.333M4.583 17.5v-15m0 15C4 17.5 2.91 15.838 2.5 15.417M4.583 17.5c.584 0 1.674-1.662 2.084-2.083"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
