"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "src/providers/user";
import { getBaseLink } from "src/utils";

export default function Page() {
  const { user } = useUser();
  const session = useSession();

  useEffect(() => {
    async function getSession() {
      if (session.status !== "authenticated") return;
      let fetchConfig = await fetch(getBaseLink("api/config"));
      let config = await fetchConfig.json();
    }
    if (!!session.data) getSession();
  }, [session.data]);

  if (!user) return null;

  return (
    <div className="flex-1">
      general
      {Object.keys(user).map((key) => {
        if (key === "extraProperties") return;
        return (
          <div key={key}>
            {key}:{(user as any)[key]}
          </div>
        );
      })}
    </div>
  );
}
