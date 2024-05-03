"use client";
import Dashboard from '@repo/ayasofyazilim-ui/templates/dashboard';
import { data } from './data';
import { columns } from './columns';

export default function Page(): JSX.Element {
    const rolesCards = data.items.map((item) => {
        return {
            title: item.name,
            content: item.userCount,
            description: "Users",
            footer: item.isPublic ? "Public" : "Not Public",
        };
    });
    return (
        <Dashboard filterBy="name" cards={rolesCards} data={data.items} columns={columns} />
    );
}