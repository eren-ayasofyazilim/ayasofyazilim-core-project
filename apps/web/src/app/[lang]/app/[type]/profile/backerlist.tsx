"use client";

import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { useState } from "react";
import { deleteBacker, getBackers, getBackersIndividuals } from "./actions";

export function BackerList({ backers, type }: { type: string }) {
  const [backersState, setBackers] = useState(backers);
  const cards = backersState?.map((backer) => {
    return {
      title: backer.name || "",
      description: backer.taxpayerId || "",
      content: backer.legalStatusCode || "",
      footer: backer.customerNumber || "",
      onEdit: `profile/${backer.backerId}`,
      onDelete: async () => {
        await deleteBacker(backer.backerId);
        await updataBackers();
      },
    };
  });
  async function updataBackers() {
    let backers;
    if (type === "companies") {
      backers = await getBackers();
    } else if (type === "individuals") {
      backers = await getBackersIndividuals();
    }
    setBackers(backers);
  }
  return (
    <div className="max-h-[350px]">
      <CardList
        cards={
          cards.length > 0
            ? cards
            : [
                {
                  title: "",
                  description: "",
                  content: "Create new backer",
                  footer: "",
                },
              ]
        }
      />
    </div>
  );
}
