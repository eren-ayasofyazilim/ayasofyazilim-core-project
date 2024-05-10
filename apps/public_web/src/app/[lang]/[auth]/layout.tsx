"use client";

import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getBaseLink } from "src/utils";

export default function Layout({ children }: { children: JSX.Element }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(getBaseLink("profile", true));
    }
  }, [session.status]);

  if (session?.status === "unauthenticated") {
    return children;
  }

  return (
    <Spinner
      className="stroke-purple-900"
      variant="transparent"
      fullScreen={false}
    />
  );
}
