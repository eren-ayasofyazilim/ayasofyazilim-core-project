"use client";
import { useParams } from "next/navigation";
import { LocaleProvider } from "./locale";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const params = useParams();

  const lang = params?.lang?.toString() || "en";
  return (
    <div>
      <LocaleProvider lang={lang}>{children}</LocaleProvider>
    </div>
  );
}
