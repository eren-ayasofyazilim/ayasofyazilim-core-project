"use client";
import { SessionProvider } from "next-auth/react";
import { getBaseLinkWithoutLocale } from "src/utils";

export default function AuthSession({ children }: { children: JSX.Element }) {
  return (
    <SessionProvider basePath={getBaseLinkWithoutLocale("api/auth")}>
      {children}
    </SessionProvider>
  );
}
