import { SVGProps } from "react";

export function BookmarkIcon({
  color = "currentColor",
  strokeColor = "currentColor",
  ...props
}: { color?: string; strokeColor?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 3.27835C1 2.53169 1 2.15835 1.14533 1.87302C1.27316 1.62215 1.47713 1.41818 1.728 1.29035C2.01333 1.14502 2.38667 1.14502 3.13333 1.14502H6.86667C7.61333 1.14502 7.98667 1.14502 8.272 1.29035C8.52287 1.41818 8.72684 1.62215 8.85467 1.87302C9 2.15835 9 2.53169 9 3.27835V12.1484C9 12.4724 9 12.6344 8.93267 12.723C8.90357 12.7616 8.86644 12.7934 8.82385 12.8162C8.78126 12.8389 8.73422 12.8522 8.686 12.855C8.57467 12.8617 8.44 12.7717 8.17067 12.5924L5 10.4784L1.82933 12.5917C1.56 12.7717 1.42533 12.8617 1.31333 12.855C1.26522 12.8521 1.21832 12.8388 1.17585 12.816C1.13338 12.7932 1.09636 12.7615 1.06733 12.723C1 12.6344 1 12.4724 1 12.1484V3.27835Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
