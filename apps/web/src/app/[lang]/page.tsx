"use client";
import { Button } from "@/components/ui/button";
import LanguageSelector from "components/language-selector";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { isServerSide } from "src/utils";

export default function Page(): JSX.Element {
  return (
    <div>
      <LanguageSelector />

      <Link href={"login"}>Login</Link>
    </div>
  );
}
