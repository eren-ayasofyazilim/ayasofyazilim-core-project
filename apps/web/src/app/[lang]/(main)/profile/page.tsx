"use client";
import { useUser } from "src/providers/user";

export default function Page() {
  const { user } = useUser();

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
