import { type SVGProps } from "react";

export const Clock = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M7.999 14.67a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.333ZM6.332 6.336l2.333 2.333m2-3.333L7.332 8.669"
        clipPath="url(#a)"
        strokeWidth="1.25"
      />
    </svg>
  );
};
