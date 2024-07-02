"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ayasofyazilim-ui/molecules/dropdown-menu";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "node_modules/@repo/ayasofyazilim-ui/src/molecules/tables/data";

export default async function Page() {

    const cards = [
        {
            title: 'Paid',
            content: '15%',
            description: 'Number of paid taxes',
            footer: 'Your target is 100%',
        },
        {
            title: 'Paid',
            content: '15%',
            description: 'Number of paid taxes',
            footer: 'Your target is 100%',
        },
        {
            title: 'People',
            content: '15k',
            description: 'Number of people in the system',
            footer: 'Your target is 20K',
        },
        {
            title: 'WIP',
            content: '1',
            description: 'Number of WIP refunds',
            footer: 'Your target is 0',
        },
    ];

    const columns: ColumnDef<Payment>[] = [
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
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('status')}</div>
            ),
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
        },
        {
            accessorKey: 'amount',
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue('amount'));

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(amount);

                return <div className="text-right font-medium">{formatted}</div>;
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original;

                return (
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
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const data: Payment[] = [
        {
            id: 'm5gr84i9',
            amount: 316,
            status: 'success',
            email: 'ken99@yahoo.com',
        },
        {
            id: '3u1reuv4',
            amount: 242,
            status: 'success',
            email: 'Abe45@gmail.com',
        },
        {
            id: 'derv1ws0',
            amount: 837,
            status: 'processing',
            email: 'Monserrat44@gmail.com',
        },
        {
            id: '5kma53ae',
            amount: 874,
            status: 'success',
            email: 'Silas22@gmail.com',
        },
        {
            id: 'bhqecj4p',
            amount: 721,
            status: 'failed',
            email: 'carmella@hotmail.com',
        },
    ];



    return <div className="container">
        <Dashboard
            withCards={true}
            withTable={true}
            // isLoading={isLoading}
            filterBy={"test"}
            cards={cards}
            data={data}
            columnsData={
                {
                    type: 'Custom',
                    data: columns,
                }
            }
        />
    </div>
}