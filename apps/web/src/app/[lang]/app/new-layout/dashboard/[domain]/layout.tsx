/* eslint-disable @typescript-eslint/no-explicit-any -- TODO: we need to fix this*/
"use client";

interface LayoutProps {
  children: JSX.Element;
  params?: any;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="mx-4 h-full">{children}</div>;
}
