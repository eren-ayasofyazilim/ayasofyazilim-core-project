"use server";

import { signOut } from "auth";
import { getBaseLink } from "src/utils";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await signOut({ redirect: false });
  redirect(getBaseLink("login", true));
}
