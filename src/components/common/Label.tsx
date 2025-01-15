import { ReactNode } from "react";

type TLabel = {
  icon: ReactNode;
  text: ReactNode;
  gap?: number;
};
export function Label({ icon, text, gap }: TLabel) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: gap ?? 4,
      }}
    >
      {icon}
      {text}
    </div>
  );
}
