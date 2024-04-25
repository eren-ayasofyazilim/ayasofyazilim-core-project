"use client";

import { Button } from "@/components/ui/button";
import LanguageSelector from "components/language-selector";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <div>
      <LanguageSelector />

      <Link href={"login"}>Login</Link>
      <Button onClick={async () => {
        await signIn("credentials", { password: process.env.PASSWORD , email: process.env.USERNAME, redirect:false} );
      }} >Hello world</Button>
    </div>
  );
}
