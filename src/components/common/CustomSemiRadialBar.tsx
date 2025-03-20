interface CustomRadialBar {
  width: number;
  height: number;
  radius: number;
  coloredSize: number;
  mutedSize: number;
  color?: string;
  gradient?: string[];
  gradientId?: string;
  mutedColor: string;
  coverage: number;
  centerHTML: React.ReactNode;
}

export default function CustomSemiRadialBar({
  width,
  height,
  radius,
  coloredSize,
  mutedSize,
  color = "#334155",
  gradient,
  gradientId,
  mutedColor,
  coverage,
  centerHTML,
}: CustomRadialBar) {
  console.log(gradient);

  // Calculate the circumference for a semi-circle
  const circumference = Math.PI * radius;
  const strokeDasharray = `${
    circumference * (coverage / 100)
  } ${circumference}`;

  return (
    <div style={{ width: width }} className="relative">
      <svg width={width} height={height} viewBox="0 0 200 110">
        {gradient != undefined && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
        )}

        {/* Background muted semi-circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={mutedColor}
          strokeWidth={mutedSize}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-180 100 100)"
        />

        {/* Colored semi-circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={gradient != undefined ? `url(#${gradientId})` : color}
          strokeWidth={coloredSize}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circumference / 2}
          strokeLinecap="round"
          transform="rotate(0 100 100)"
        />
      </svg>

      {/* Center content */}
      <div className="absolute bottom-0 left-0 w-full pb-1 flex justify-center items-center">
        <div>{centerHTML}</div>
      </div>
    </div>
  );
}
