"use client";
import LanguageSelector from "components/language-selector";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <div>
      <LanguageSelector />
      <Link href={"login"}>Login</Link>
    </div>
  );
}
