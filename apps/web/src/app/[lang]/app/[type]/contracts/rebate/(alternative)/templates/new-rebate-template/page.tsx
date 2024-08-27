/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  CalculateNetCommissionInsteadOfRebate: z.boolean().optional(),
});

const initialFeesData: any[] = [];
const initialSetupData: any[] = [];

function NameCell({ getValue, row: { index }, column: { id }, table }: any) {
  const name = getValue();
  const [value, setValue] = useState(name);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <Input
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="text"
      value={value as string}
    />
  );
}

function AmountCell({ getValue, row: { index }, column: { id }, table }: any) {
  const amount = getValue();
  const [value, setValue] = useState(amount);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(amount);
  }, [amount]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as number}
    />
  );
}

const feescolumns = {
  columns: [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={() => {
            row.toggleSelected();
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">Name</div>,
      cell: (props: any) => <NameCell {...props} />,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-center">Amount</div>,
      cell: (props: any) => <AmountCell {...props} />,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(row.index, "actions", null);
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ],
};

function SetupCell({ getValue, row: { index }, column: { id }, table }: any) {
  const setupValue = getValue() as string | undefined;
  const [value, setValue] = useState<string | undefined>(setupValue);

  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(setupValue);
  }, [setupValue]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="Cash">Cash</SelectItem>
        <SelectItem value="Credit or Debit Card">
          Credit or Debit Card
        </SelectItem>
        <SelectItem value="Alipay">Alipay</SelectItem>
        <SelectItem value="WeChat">WeChat</SelectItem>
        <SelectItem value="Cash via partner">Cash via partner</SelectItem>
        <SelectItem value="Refund later">Refund later</SelectItem>
      </SelectContent>
    </Select>
  );
}

function Fixedfee({ getValue, row: { index }, column: { id }, table }: any) {
  const fixedFeeValue = getValue();
  const [value, setValue] = useState(fixedFeeValue);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(fixedFeeValue);
  }, [fixedFeeValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
}

function Variablefee({ getValue, row: { index }, column: { id }, table }: any) {
  const variableFeeValue = getValue() as string | undefined;
  const [value, setValue] = useState<string | undefined>(variableFeeValue);

  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(variableFeeValue);
  }, [variableFeeValue]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="% of GC">% of GC</SelectItem>
        <SelectItem value="% of GC without VAT">% of GC without VAT</SelectItem>
        <SelectItem value="% of VAT">% of VAT</SelectItem>
        <SelectItem value="% of SIS">% of SIS</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PercentCell({ getValue, row: { index }, column: { id }, table }: any) {
  const percentValue = getValue();
  const [value, setValue] = useState(percentValue);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(percentValue);
  }, [percentValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
}

const setupcolumns = {
  columns: [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "refundmethod",
      header: () => <div className="text-center">Refund method</div>,
      cell: (props: any) => <SetupCell {...props} />,
    },
    {
      accessorKey: "fixedfee",
      header: () => <div className="text-center">Fixed fee</div>,
      cell: (props: any) => <Fixedfee {...props} />,
    },
    {
      accessorKey: "variablefee",
      header: () => <div className="text-center">Variable fee</div>,
      cell: (props: any) => <Variablefee {...props} />,
    },
    {
      accessorKey: "percent",
      header: () => <div className="text-center">% Percent</div>,
      cell: (props: any) => <PercentCell {...props} />,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(row.index, "actions", null);
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ],
};

function Rebate() {
  const [autoFormData, setAutoFormData] = useState<Record<string, any>>({});
  const [feesData, setFeesData] = useState(initialFeesData);
  const [setupData, setSetupData] = useState(initialSetupData);

  const handleFormChange = (newFormData: any): void => {
    setAutoFormData(newFormData);
  };

  const handleSubmit = () => {
    const filteredFeesData = feesData.filter((row) => !isRowEmpty(row));
    const filteredSetupData = setupData.filter((row) => !isRowEmpty(row));

    const payload: any = {
      autoFormData,
      feesData: filteredFeesData,
      setupData: filteredSetupData,
    };
    return payload;
  };

  const isRowEmpty = (row: any): boolean => {
    return Object.values(row).every((value) => value === "" || value === null);
  };

  const feesHeaders = { name: "", amount: "" };

  const setupHeaders = {
    refundmethod: "",
    fixedfee: "",
    variablefee: "",
    percent: "",
  };

  return (
    <div className="flex h-full w-full flex-row ">
      <Card className="m-0 w-full overflow-auto border-0 bg-transparent pb-16 shadow-none">
        <CardHeader className="flex flex-row items-center gap-2 text-2xl font-bold">
          <EditIcon className="w-6 text-slate-600" />
          Edit Template Information
        </CardHeader>
        <CardContent>
          <div className="px-9 [&>div>form>div]:space-y-4">
            <AutoForm
              fieldConfig={{
                withoutBorder: { fieldType: "switch" },
                CalculateNetCommissionInsteadOfRebate: {
                  fieldType: "switch",
                },
              }}
              formSchema={formSchema}
              onParsedValuesChange={handleFormChange}
            />
          </div>

          <div className="mt-4 p-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">Processing fees</span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={feesHeaders}
                columnsData={{
                  type: "Custom",
                  data: feescolumns,
                }}
                data={feesData}
                editable
                onDataUpdate={() => {
                  setFeesData(initialFeesData);
                }}
                showView={false}
              />
            </div>
          </div>

          <div className="mt-4 p-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">Rebate set up</span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={setupHeaders}
                columnsData={{
                  type: "Custom",
                  data: setupcolumns,
                }}
                data={setupData}
                editable
                onDataUpdate={() => {
                  setSetupData(initialSetupData);
                }}
                showView={false}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-5 px-9">
            <Button className=" w-40 ">Cancel</Button>
            <Button className=" w-40 " onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Rebate;
