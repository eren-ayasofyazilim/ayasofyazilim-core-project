"use client";
import Dashboard from '@repo/ayasofyazilim-ui/templates/dashboard';
import { data } from './data';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { getBaseLink, getBaseLinkWithoutLocale } from 'src/utils';
import { z } from 'zod';
import { tableAction } from '@repo/ayasofyazilim-ui/molecules/tables';

export default function Page(): JSX.Element {
    const [roles, setRoles] = useState<any>();

    const formSchema = z.object({
        name: z.string().max(256).min(0).optional(), // Assuming `name` is optional as it's not in the required list
        isDefault: z.boolean(),
        isPublic: z.boolean(),
        extraProperties: z.object({
            // Assuming any additional properties are of type `unknown`
            additionalProperties: z.unknown(),
            nullable: z.boolean().optional(),
            readOnly: z.boolean().optional()
        }).nullable()
    })
    

    const autoFormArgs = {
        formSchema,
    };

    const action: tableAction = {
        cta: "New Role",
        description: "Create a new role for users",
        autoFormArgs,
        callback: (e) => {
            fetch(getBaseLinkWithoutLocale("/api/admin"), {
                method: 'POST',
                body: JSON.stringify(e)
            }).then(response => response.json()) // Parse the response as JSON
            .then(data => console.log(data)) // Do something with the response data
            .catch((error) => {
              console.error('Error:', error); // Handle any errors
            });
        } 
    };
    useEffect(() => {
        fetch(getBaseLink("/api/admin"))
            .then((res) => res.json())
            .then((data) => {
                setRoles(data);
            });
    }, [])

    const rolesCards = roles?.items.map((item: any) => {
        return {
            title: item.name,
            content: item.userCount,
            description: "Users",
            footer: item.isPublic ? "Public" : "Not Public",
        };
    });
    return (
        <Dashboard
            filterBy="name"
            cards={rolesCards}
            data={roles?.items}
            columns={columns}
            action={action}
        />
    );
}