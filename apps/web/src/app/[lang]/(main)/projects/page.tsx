"use server";

import { getProjectServiceClient } from "src/lib";

export default async function Page() {
  const client = getProjectServiceClient();
  const projectData = await client.project.getApiProjectServiceProject();
  if (!projectData) {
    return <div>No data</div>;
  }

  return (
    <div className="bg-zinc-800 flex flex-auto flex-col justify-center items-start h-screen text-white text-xl">
      <h1 className="text-2xl">Aleyküm selam!</h1>
      <br />
      <div>{projectData?.items && JSON.stringify(projectData.items[0])}</div>
    </div>
  );
}
