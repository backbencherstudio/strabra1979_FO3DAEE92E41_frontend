import { type SVGProps } from 'react'

export const Edit = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g stroke="currentColor" clipPath="url(#a)" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M11.728 3.237c.621-.673.932-1.009 1.262-1.205a2.59 2.59 0 0 1 2.585-.04c.336.187.656.514 1.296 1.168s.96.98 1.142 1.323c.44.827.426 1.829-.038 2.642-.192.337-.521.654-1.18 1.289L8.96 15.96c-1.248 1.202-1.872 1.804-2.652 2.108s-1.638.282-3.352.238L2.72 18.3c-.522-.013-.783-.02-.935-.192-.151-.172-.13-.438-.09-.97l.023-.289c.117-1.497.175-2.245.468-2.918.292-.672.796-1.219 1.804-2.311zm-.895.097 5.834 5.833" />
        <path d="M11.667 18.334h6.666" strokeLinecap="round" />
      </g>
    </svg>
  )
}
