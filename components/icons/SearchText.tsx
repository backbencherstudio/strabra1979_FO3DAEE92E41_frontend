import { type SVGProps } from "react";

export const SearchText = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M2.5 9h4m-4 5h4m-4-10h16m.036 13.036L21.5 20M20 13.5a5 5 0 1 0-10 0 5 5 0 0 0 10 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
