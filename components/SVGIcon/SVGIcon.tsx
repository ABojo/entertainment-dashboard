interface SVGIconProps {
  type: "movie" | "tv" | "play";
  className?: string;
  height?: number;
  width?: number;
}

export default function SVGIcon({ type, className, height, width }: SVGIconProps): JSX.Element {
  switch (type) {
    case "movie":
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          width={width || 20}
          height={height || 20}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
            fill="currentColor"
          />
        </svg>
      );
    case "tv":
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          width={width || "20"}
          height={height || 20}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
            fill="currentColor"
          />
        </svg>
      );
    case "play":
      return (
        <svg
          className={className}
          viewBox="0 0 30 30"
          width={width || 30}
          height={height || 30}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
