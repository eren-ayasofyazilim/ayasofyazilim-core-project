import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchRoles, fetchUsers, Role, User } from "./action";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, Row } from "@tanstack/react-table";
import { Volo_Abp_Identity_IdentityUserDto } from "@ayasofyazilim/saas/AccountService";

interface GenericModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedItems: T[]) => void;
  addedItems: T[];
  fetchItems: () => Promise<T[]>;
  columns: Array<{
    header: string;
    accessorKey: keyof T;
    cell?: (row: any) => JSX.Element;
  }>;
  filterBy: string;
  title: string;
  checkboxColumnKey: keyof T;
}

export const GenericModal = <T extends { id: string }>({
  isOpen,
  onClose,
  onSave,
  addedItems,
  fetchItems,
  columns,
  filterBy,
  title,
  checkboxColumnKey,
}: GenericModalProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const loadItems = async () => {
        const items = await fetchItems();
        const filteredItems = items.filter(
          (item) => !addedItems.some((addedItem) => addedItem.id === item.id)
        );
        setItems(filteredItems);
        setSelectedItems(new Set(addedItems.map((item) => item.id)));
        setLoading(false);
      };
      loadItems();
    } else {
      setSelectedItems(new Set());
    }
  }, [isOpen, addedItems, fetchItems]);

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      return newSelected;
    });
  };

  const handleSave = () => {
    const selectedItemList = items.filter((item) => selectedItems.has(item.id));
    onSave(selectedItemList);
  };

  const handleToggleAll = (selectAll: boolean, rows: Row<T>[]) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      rows.forEach((row) => {
        if (selectAll) {
          newSelected.add(row.original.id);
        } else {
          newSelected.delete(row.original.id);
        }
      });
      return newSelected;
    });
  };

  const enhancedColumns = [
    {
      id: "select",
      header: ({ table }: { table: Table<any> }) => {
        const rows = table.getRowModel().rows;
        const isAllSelected = rows.every((row: Row<T>) =>
          selectedItems.has(row.original.id)
        );
        return (
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              handleToggleAll(!!value, rows);
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }: { row: Row<Volo_Abp_Identity_IdentityUserDto> }) => (
        <Checkbox
          checked={
            row.getIsSelected() || selectedItems.has(row.original.id as string)
          }
          className="mr-6"
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            handleToggleItem(row.original.id as string);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map((column) => {
      if (column.accessorKey === checkboxColumnKey) {
        return {
          ...column,
        };
      }
      return column;
    }),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DataTable
          columnsData={{ type: "Custom", data: enhancedColumns }}
          filterBy={filterBy}
          data={items}
          isLoading={loading}
        />
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UserModal: React.FC<
  Omit<
    GenericModalProps<User>,
    "fetchItems" | "columns" | "filterBy" | "title" | "checkboxColumnKey"
  >
> = (props) => (
  <GenericModal
    {...props}
    fetchItems={fetchUsers}
    columns={[
      {
        header: "User Name",
        accessorKey: "userName",
      },
      {
        header: "Email Address",
        accessorKey: "email",
      },
    ]}
    filterBy="userName"
    title="Select users"
    checkboxColumnKey="userName"
  />
);

export const RoleModal: React.FC<
  Omit<
    GenericModalProps<Role>,
    "fetchItems" | "columns" | "filterBy" | "title" | "checkboxColumnKey"
  >
> = (props) => (
  <GenericModal
    {...props}
    fetchItems={fetchRoles}
    columns={[
      {
        header: "Role Name",
        accessorKey: "name",
      },
    ]}
    filterBy="name"
    title="Select roles"
    checkboxColumnKey="name"
  />
);

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-primary text-white">
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
