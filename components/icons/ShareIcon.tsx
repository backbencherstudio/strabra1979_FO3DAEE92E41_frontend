import { type SVGProps } from 'react'

export const ShareIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="m15.993 7.866-1.638-1.643c-1.18-1.184-1.642-1.821-2.281-1.596-.797.28-.535 2.052-.535 2.65-1.238 0-2.526-.11-3.747.12C3.76 8.154 2.5 11.428 2.5 14.999c1.14-.809 2.28-1.67 3.652-2.044 1.712-.468 3.623-.245 5.387-.245 0 .599-.262 2.37.535 2.651.724.255 1.101-.412 2.281-1.596l1.638-1.643c1.005-1.008 1.507-1.512 1.507-2.128s-.502-1.12-1.507-2.128"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
