"use client";

export default function Page(): JSX.Element {
  return (
    <main className="h-auto p-4 pt-20">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64" />
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64" />
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64" />
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64" />
      </div>
      <div className="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300" />
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
      </div>
      <div className="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72" />
      </div>
    </main>
  );
}
