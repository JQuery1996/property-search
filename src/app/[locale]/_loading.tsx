// app/loading.tsx
import { Spin } from "antd";

export default function _loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 326px)", // 100vh - (header height + footer height)
      }}
    >
      <Spin size="large" /> {/* Ant Design spinner */}
    </div>
  );
}
