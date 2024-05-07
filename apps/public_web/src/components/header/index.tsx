"use client";

import LanguageSelector from "components/language-selector";
import Link from "next/link";
import { useConfig } from "src/providers/configuration";
import { useUser } from "src/providers/user";

export default function Header({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}): JSX.Element {
  const { user, getUser } = useUser();
  const { config, setConfig } = useConfig();
  return (
    <div className="bg-gray-100 p-1 w-full">
      <div className="container flex justify-end gap-4">
        {user ? (
          <Link href="/">Home</Link>
        ) : (
          <Link href="/register">Register</Link>
        )}
        <LanguageSelector menuAlign={menuAlign} />
      </div>
    </div>
  );
}
