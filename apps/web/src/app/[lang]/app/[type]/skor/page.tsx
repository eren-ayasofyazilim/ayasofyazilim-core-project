"use client";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <iframe
        className="h-full w-full border-0"
        src="http://192.168.1.57:8501"
        title="Embedded Page"
      />
    </div>
  );
}
