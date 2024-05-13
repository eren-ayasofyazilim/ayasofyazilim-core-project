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

function createSortableHeader(column: any, name: string) {
  return (
    <Button
      className='p-0'
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {name}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  )
}
function readOnlyCheckbox(row: any, value: string) {
  return <Checkbox checked={row.getValue(value)} disabled={true} />
}
function normalizeName(name: string) {
  // remove is from the begining of the string if it exists
  if (name.startsWith('is')) {
    name = name.slice(2);
  }
  // seperate camelCase
  name = name.replace(/([A-Z])/g, ' $1');
  // make first letter uppercase
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

function generateColumns(tableType: any, excludeList: string[] = []) {
  const generatedTableColumns: any = [];
  Object.keys(tableType.properties).forEach((key) => {
    let accessorKey = key;
    let header = normalizeName(key);
    let value = tableType.properties[key];
    if (excludeList.includes(key)) {
      return;
    }
    if (value.type === 'boolean') {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: ({ row }) => {
          return readOnlyCheckbox(row, key);
        }
      })
    }
    if (value.type === 'string') {
      generatedTableColumns.push({
        accessorKey,
        header: ({ column }: { column: any }) => (
          createSortableHeader(column, header)
        ),
      })
    }
    if (value.type === 'integer') {
      generatedTableColumns.push({
        accessorKey,
        header,
      })
    }
  });

  return generatedTableColumns;
}


export function columnsGenerator(callback: any, autoFormArgs: any, tableType: any, excludeList: string[] = []) {
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
    ...generateColumns(tableType, excludeList),
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
                  <DialogTitle>{"Edit the role"}</DialogTitle>
                  <DialogDescription>{"Edit the role"}</DialogDescription>
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