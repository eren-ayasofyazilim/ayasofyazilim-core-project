"use client";
import Issueform from "@repo/ayasofyazilim-ui/molecules/issue-form";
import React from "react";
import { getIndexOfTagByFacturaId, tags } from "../data";

export default function Page(): JSX.Element {
  //   {
  //   params,
  // }: {
  //   params: { id: string };
  // }
  const index = getIndexOfTagByFacturaId("TF123457");
  return index > -1 ? <Issueform tag={tags[index]} /> : <div>Not Found</div>;
}
