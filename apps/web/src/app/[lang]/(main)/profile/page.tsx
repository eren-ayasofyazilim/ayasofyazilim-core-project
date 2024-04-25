"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "src/providers/user";

export default function Page() {
  const { user } = useUser();
  const session = useSession()
  useEffect(() => {
    console.log("Effect ");
    async function getSession(){
      console.log("session from effect",session)
    }
    getSession();
  }, []);

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
