import { type SVGProps } from 'react'

export const PlayCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <g stroke="#fff" strokeWidth="1.5">
        <circle cx="28.001" cy="28" r="23.333" />
        <path
          fill="#D9D9D9"
          d="M36.059 28.921c-.354 1.463-2.024 2.496-5.365 4.563-3.23 1.998-4.845 2.997-6.146 2.595a3.2 3.2 0 0 1-1.424-.915c-.956-1.05-.956-3.089-.956-7.164s0-6.113.956-7.163a3.2 3.2 0 0 1 1.424-.916c1.301-.401 2.916.598 6.146 2.595 3.34 2.067 5.011 3.1 5.365 4.563a3.9 3.9 0 0 1 0 1.842Z"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
