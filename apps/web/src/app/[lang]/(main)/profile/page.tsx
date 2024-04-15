//"use client";

import { getAccountServiceClient } from "src/lib";

export default async function Page() {
  const client = getAccountServiceClient();
  const userData = await client.profile.getApiAccountMyProfile();

  if (!userData) {
    return <div>No data</div>;
  }

  return (
    <div className="grid gap-6">
      general
      {Object.keys(userData).map((key) => {
        if (key === "extraProperties") return;
        return (
          <div>
            {key}:{userData[key]}
          </div>
        );
      })}
    </div>
  );
}
