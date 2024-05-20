"use client";
import Dashboard from '@repo/ayasofyazilim-ui/templates/dashboard';
import { $Volo_Saas_Host_Dtos_SaasTenantDto as tableType } from "@ayasofyazilim/saas/SaasService"
import { useEffect, useState } from 'react';
import { z } from 'zod';
import type { tableAction } from '@repo/ayasofyazilim-ui/molecules/tables';
import { getBaseLink } from 'src/utils';



export default function Page(): JSX.Element {
    const [roles, setRoles] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);



    function getRoles() {
        const baseLink = getBaseLink("/api/tenant");
        console.log(baseLink)
        fetch(baseLink)
            .then((res) => res.json())
            .then((data) => {
                setRoles(data);
                setIsLoading(false);
            });
    }



    const formSchema = z.object({
        name: z.string().max(64).min(0),  
        editionId: z.string().uuid().nullable().optional(),  
        adminEmailAddress: z.string().email().max(256).min(0), 
        adminPassword: z.string().max(128).min(0), 
        activationState: z.enum(['1', '2', '3']).optional(),  
    });
    
    

    const autoFormArgs = {
        formSchema,
    };




    const editformSchema = z.object({
        name: z.string().max(64).min(0).optional(),  
        editionId: z.string().uuid().nullable().optional(),  
        activationState: z.enum(['1', '2', '3']).optional(),  
    });
    


    const editautoFormArgs = {
        formSchema:editformSchema,
    };


    const action: tableAction = {
        cta: "New Role",
        description: "Create a new role for users",
        autoFormArgs,
        callback: (e) => {
            fetch(getBaseLink("/api/tenant"), {
                method: 'POST',
                body: JSON.stringify(e)
            }).then(response => response.json()) // Parse the response as JSON
                .then(data => {
                    getRoles();
                }) // Do something with the response data
                .catch((error) => {
                    console.error('Error:', error); // Handle any errors
                });
        }
    };



    const tableHeaders = [
        {
            name: "name",
            isSortable: true,
        },
        {
            name: "isDefault",
        },
        {
            name: "isPublic",
        },
        {
            name: "userCount"
        }
    ]




    useEffect(() => {
        setIsLoading(true);
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





    const excludeList = ['id', 'extraProperties', 'concurrencyStamp']



    const onEdit = (data: any, row: any) => {
        
        fetch(getBaseLink("/api/tenant"), {
            method: 'PUT',
            body: JSON.stringify({
                id: row.id,
                requestBody: JSON.stringify(data)
            })
        }).then(response => response.json()) // Parse the response as JSON
            .then(data => {
                getRoles();
            }) // Do something with the response data
            .catch((error) => {
                console.error('Error:', error); // Handle any errors
            });
    }




    const onDelete = (e: any, row: any) => {
        fetch(getBaseLink("/api/tenant"), {
            method: 'DELETE',
            body: JSON.stringify(row.id)
        }).then(response => response.json()) // Parse the response as JSON
            .then(data => {
                console.log(data)
                getRoles();
            }) // Do something with the response data
            .catch((error) => {
                console.error('Error:', error); // Handle any errors
            });
    }




    const columnsData = {
        type: "Auto",
        data: { getRoles, autoFormArgs:editautoFormArgs, tableType, excludeList, onEdit, onDelete }
    }





    return (
        <Dashboard
            action={action}
            cards={rolesCards}
            columnsData={columnsData}
            data={roles?.items}
            filterBy="name"
            isLoading={isLoading}
            withCards={false}
            withTable
        />
    );
}


