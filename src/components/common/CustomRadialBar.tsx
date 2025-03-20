"use client";
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

export default function CustomRadialBar({
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
  return (
    <div style={{ width: width, height: height }} className="relative">
      <svg width={width} height={height} viewBox="0 0 200 200">
        {gradient != undefined && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
        )}

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={mutedColor}
          strokeWidth={mutedSize}
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={gradient != undefined ? `url(#${gradientId})` : color}
          strokeWidth={coloredSize}
          strokeDasharray={`${radius * 2 * Math.PI * coverage * 0.01} ${
            radius * 2 * Math.PI * (100 - coverage) * 0.01
          }`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div>{centerHTML}</div>
      </div>
    </div>
  );
}
