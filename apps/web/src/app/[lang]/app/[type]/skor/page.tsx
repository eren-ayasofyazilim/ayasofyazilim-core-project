"use client";

export default function Page() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="http://192.168.1.57:8501"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Embedded Page"
      />
    </div>
  );
}
