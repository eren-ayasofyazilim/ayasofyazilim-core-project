"use client"
import { SessionProvider } from "next-auth/react"

export default function AuthSession({ children }: { children: JSX.Element }) {
  return (
    <SessionProvider basePath={window.location.origin + "/api/auth"}>
      {children}
    </SessionProvider>
  );
}

