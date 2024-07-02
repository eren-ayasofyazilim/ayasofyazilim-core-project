"use client";


import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { deleteBacker, getBackers } from "./actions";
import { useState } from "react";

export function BackerList({backers}) {
    console.log(backers);
    const [loading, setLoading] = useState(true);
    const [backersState, setBackers] = useState(backers);

    async function updataBackers() {
        const backers = await getBackers();
        setBackers(backers);
        setLoading(false);
    }
    return (<CardList
        cards={
            backersState?.map((backer) => {
                return {
                    title: backer.name || "",
                    description: backer.taxpayerId || "",
                    content: backer.legalStatusCode || "",
                    footer: backer.customerNumber || "",
                    onEdit: "profile/" + backer.backerId,
                    onDelete: async () => {
                        console.log("delete", backer.backerId);
                        await deleteBacker(backer.backerId);
                        await updataBackers();
                    },
                };
            }) || []
        }
    ></CardList>)
}