"use client";
import Dashboard from '@repo/ayasofyazilim-ui/templates/dashboard';
import { data } from './data';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { getBaseLink } from 'src/utils';
import { z } from 'zod';
import { tableAction } from '@repo/ayasofyazilim-ui/molecules/tables';
import { Volo_Abp_Identity_IdentityRoleCreateDto } from "@ayasofyazilim/saas/IdentityService"

export default function Page(): JSX.Element {
    const [roles, setRoles] = useState<any>();
    function getRoles(){
        fetch(getBaseLink("/api/admin"))
            .then((res) => res.json())
            .then((data) => {
                setRoles(data);
            });
    }

    const formSchema = z.object({
        name: z.string().max(256).min(0), // Assuming `name` is optional as it's not in the required list
        isDefault: z.boolean().optional(),
        isPublic: z.boolean().optional(),
        extraProperties: z.object({
            // Assuming any additional properties are of type `unknown`
            additionalProperties: z.unknown().optional(),
            nullable: z.boolean().optional(),
            readOnly: z.boolean().optional()
        }).optional().nullable()
    })
    

    const autoFormArgs = {
        formSchema,
    };

    const action: tableAction = {
        cta: "New Role",
        description: "Create a new role for users",
        autoFormArgs,
        callback: (e) => {
            fetch(getBaseLink("/api/admin"), {
                method: 'POST',
                body: JSON.stringify(e)
            }).then(response => response.json()) // Parse the response as JSON
            .then(data =>{
                getRoles();
            }) // Do something with the response data
            .catch((error) => {
              console.error('Error:', error); // Handle any errors
            });
        } 
    };
    useEffect(() => {
        getRoles();
    }, [])
    const rolesCards = roles?.items.slice(-4).map((item: any) => {
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