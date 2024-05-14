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
import { useState } from 'react';
import AutoformDialog from '@repo/ayasofyazilim-ui/molecules/dialog';

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


export function columnsGenerator(callback: any, autoFormArgs: any, tableType: any, excludeList: string[] = [], onEdit: (e: any, originalRow: any) => void, onDelete: (e: any, originalRow: any) => void) {
  const columns: ColumnDef<any, any>[] = [
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
        const originalRow = row.original;
        const [values, setValues] = useState<z.infer<typeof autoFormArgs.formSchema>>();
        const [open, setOpen] = useState(false);

        return (
          <>
            <AutoformDialog
              open={open}
              onOpenChange={setOpen}
              action={{ autoFormArgs, callback:onEdit, cta: 'Edit the role', description: 'Edit the role' }
              }
              triggerData={originalRow}
            />
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
                  onClick={() => navigator.clipboard.writeText(originalRow.id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    console.log(e)
                    onDelete(e, originalRow);
                  }
                  }
                >Delete role</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  console.log(e)
                  console.log(originalRow)
                  setValues(originalRow);
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