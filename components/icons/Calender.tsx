import { type SVGProps } from "react";

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M13.335 1.664v3.333M6.668 1.664v3.333m4.165-1.661H9.167c-3.143 0-4.714 0-5.69.976C2.5 5.29 2.5 6.86 2.5 10.002v1.667c0 3.143 0 4.714.976 5.69.977.977 2.548.977 5.69.977h1.667c3.143 0 4.714 0 5.69-.976.977-.977.977-2.548.977-5.69v-1.667c0-3.143 0-4.714-.976-5.69-.977-.977-2.548-.977-5.69-.977m-8.334 5h15m-7.502 3.328h.007m-.007 3.333h.007m3.322-3.333h.008m-6.667 0h.007m-.007 3.333h.007"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
};


export const CalenderSchedule = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M16 2v4M8 2v4m13 6c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22M3 10h18" />
        <path d="M18.267 18.701 17 18v-1.733M21 18a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
      </g>
    </svg>
  );
};
