"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tabs";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ayasofyazilim-ui/atoms/pagination";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import { Filter } from "components/filter";
import {
  cardProps,
  categoryOptions,
  sectorOptions,
  statusOptions,
} from "./demo-data";

export default function Page() {
  return (
    <Tabs
      defaultValue="1"
      className="w-full bg-gray-50 flex flex-grow flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between bg-white py-2 gap-2">
        <div className="flex items-center justify-center gap-2">
          <Filter options={statusOptions} title="Durum" />
          <Filter options={sectorOptions} title="Sektör" />
          <Filter options={categoryOptions} title="Kategori" />
        </div>
        <TabsList className="grid grid-cols-2 bg-gray-50 px-2">
          <TabsTrigger value="1">
            <ViewHorizontalIcon />
          </TabsTrigger>
          <TabsTrigger value="2">
            <LayoutIcon />
          </TabsTrigger>
        </TabsList>
      </div>
      <ScrollArea className="p-2 pt-0">
        <TabsContent value="1">
          <div className="w-full flex flex-wrap gap-5 overflow-auto h-full">
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
            <DetailsCard cardProps={cardProps} variant="compact-vertical" />
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="flex flex-row w-full flex-wrap justify-center gap-5 col-span-10 overflow-auto h-full">
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
            <DetailsCard cardProps={cardProps} variant="compact" />
          </div>
        </TabsContent>
      </ScrollArea>
      <div className="flex items-center justify-center bg-white py-2 gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Tabs>
  );
}
