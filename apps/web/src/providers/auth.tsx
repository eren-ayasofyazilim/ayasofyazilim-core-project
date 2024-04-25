"use client"
import { SessionProvider } from "next-auth/react"

export default function AuthSession({children}: {children: JSX.Element}) {
    // const session = await auth();
    const session = null;
    if (session?.user) {
      // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
      // filter out sensitive data before passing to client.
      session.user = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    }

    return (
        <>
      <SessionProvider basePath={"api/auth"} session={session}>
        {children}
      </SessionProvider>
      </>
    );
  }

