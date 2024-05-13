'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { data } from './data';
import { getBaseLink } from 'src/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AutoForm, { AutoFormSubmit } from '@repo/ayasofyazilim-ui/organisms/auto-form';
import { useState } from 'react';
import { set, z } from 'zod';
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

export function columnsGenerator(callback: any) {
  const columns: ColumnDef<typeof data.items>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
      enableSorting: true,
    },
    {
      accessorKey: 'isDefault',
      header: 'Default',
      cell: ({ row }) => (
        <Checkbox checked={row.getValue('isDefault')} disabled={true} />
      ),
    },
    {
      accessorKey: 'isPublic',
      header: 'Public',
      cell: ({ row }) => (
        <Checkbox checked={row.getValue('isPublic')} disabled={true} />
      ),
    },
    {
      accessorKey: 'userCount',
      header: 'User Count',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('userCount')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const role = row.original;
        const [values, setValues] = useState<z.infer<typeof autoFormArgs.formSchema>>();
        const [open, setOpen] = useState(false);

        return (
          <>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{"test"}</DialogTitle>
                  <DialogDescription>{"test"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <AutoForm
                    {...autoFormArgs}
                    onSubmit={(e) => {
                      fetch(getBaseLink("/api/admin"), {
                        method: 'PUT',
                        body: JSON.stringify({
                          id: role.id,
                          requestBody: JSON.stringify(e)
                        })
                      }).then(response => response.json()) // Parse the response as JSON
                        .then(data => {
                          callback();
                        }) // Do something with the response data
                        .catch((error) => {
                          console.error('Error:', error); // Handle any errors
                        });
                    }}
                    values={values}
                  >
                    {autoFormArgs?.children}
                    <AutoFormSubmit className='float-right'>Send now</AutoFormSubmit>
                  </AutoForm>
                </div>
                <DialogFooter>

                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  // @ts-ignore
                  onClick={() => navigator.clipboard.writeText(role.id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    console.log(e)
                    fetch(getBaseLink("/api/admin"), {
                      method: 'DELETE',
                      body: JSON.stringify(role.id)
                    }).then(response => response.json()) // Parse the response as JSON
                      .then(data => {
                        console.log(data)
                        callback();
                      }) // Do something with the response data
                      .catch((error) => {
                        console.error('Error:', error); // Handle any errors
                      });
                  }}
                >Delete role</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  console.log(role)
                  setValues(role);
                  // get data
                  setOpen(true);
                }}>
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>

        );
      },
    },
  ];
  return columns;
}