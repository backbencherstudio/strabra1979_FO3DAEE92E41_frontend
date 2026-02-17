import { type SVGProps } from "react";

export const LocationPin = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path
          d="M5.833 15c-1.524.343-2.5.87-2.5 1.461 0 1.034 2.985 1.872 6.667 1.872s6.667-.838 6.667-1.872c0-.59-.976-1.118-2.5-1.461"
          strokeLinecap="round"
        />
        <path d="M12.083 7.5a2.083 2.083 0 1 1-4.166 0 2.083 2.083 0 0 1 4.166 0Z" />
        <path d="M11.048 14.577a1.51 1.51 0 0 1-2.095 0c-2.574-2.494-6.024-5.28-4.341-9.325C5.52 3.065 7.704 1.666 10 1.666s4.48 1.4 5.389 3.586c1.68 4.04-1.76 6.84-4.341 9.325Z" />
      </g>
    </svg>
  );
};
