import { type SVGProps } from "react";

export const LinkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M8.332 11.024q.177.29.42.545a2.966 2.966 0 0 0 3.711.491q.327-.2.608-.491l2.7-2.81c1.192-1.24 1.192-3.253 0-4.495a2.97 2.97 0 0 0-4.32 0l-.594.62" />
        <path d="m9.14 15.117-.594.619a2.97 2.97 0 0 1-4.32 0c-1.192-1.242-1.192-3.254 0-4.495l2.7-2.81a2.97 2.97 0 0 1 4.32 0q.241.254.42.545" />
      </g>
    </svg>
  );
};
