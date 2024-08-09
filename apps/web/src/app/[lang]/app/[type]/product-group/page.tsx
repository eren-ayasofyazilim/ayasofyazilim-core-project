// "use server";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import React from "react";
import Table from "./table";

function getProductGroup() {
  const productGroupData = {
    totalCount: 27,
    items: [
      {
        articleCode: "131",
        name: "Marine parts",
        unitCode: 0,
        companyType: 4,
        active: true,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1485253",
        creatorId: null,
        id: "06251fe7-b5a6-23ad-674a-3a13b425e935",
      },
      {
        articleCode: "130",
        name: "Precious Stones",
        unitCode: 0,
        companyType: 4,
        active: true,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1484586",
        creatorId: null,
        id: "4f3259cc-e1fa-fe3e-ade3-3a13b425e935",
      },
      {
        articleCode: "128",
        name: "Books & Magazine, newspaper and periodical publications",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1483963",
        creatorId: null,
        id: "86d49275-dbbe-9ff9-5e22-3a13b425e935",
      },
      {
        articleCode: "129",
        name: "Gold or Silver",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.148329",
        creatorId: null,
        id: "6f052fe8-ca16-9dde-352d-3a13b425e935",
      },
      {
        articleCode: "127",
        name: "Bread & Bakery",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1482649",
        creatorId: null,
        id: "4ad184fd-91f5-4ecf-dff0-3a13b425e935",
      },
      {
        articleCode: "126",
        name: "All sacred books (Quran, Bible, Torah, Psalm)",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1482023",
        creatorId: null,
        id: "6d3048eb-db71-9adc-428c-3a13b425e935",
      },
      {
        articleCode: "3000",
        name: "Workmanship",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1481425",
        creatorId: null,
        id: "28b7fbba-47de-ccd8-bdea-3a13b425e935",
      },
      {
        articleCode: "122",
        name: "Multimedia",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1480831",
        creatorId: null,
        id: "ffb1fc4d-8781-bd52-d639-3a13b425e935",
      },
      {
        articleCode: "121",
        name: "Electronics",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1480234",
        creatorId: null,
        id: "92619e81-90a4-f2e7-a2cc-3a13b425e935",
      },
      {
        articleCode: "119",
        name: "Art & Museums",
        unitCode: 0,
        companyType: 4,
        active: false,
        food: false,
        language: "en",
        isDeleted: false,
        deleterId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierId: null,
        creationTime: "2024-07-11T16:26:13.1479586",
        creatorId: null,
        id: "c7dbd9df-8406-e9a2-1b16-3a13b425e935",
      },
    ],
  };
  return { productGroupData: productGroupData.items };
}

export default function Page(): JSX.Element {
  // noStore();
  const { productGroupData } = getProductGroup();

  return (
    <>
      <PageHeader
        description="Ürün gruplarını buradan oluşturabilir veya görüntüleyebilirsiniz."
        title="Ürün Grupları"
      />

      {/* <div className="flex justify-end flex-row mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Yeni Ürün Grubu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Yeni Ürün Grubu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="profile/new-individual">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Bireysel Profil</span>
                </DropdownMenuItem>
              </Link>
              <Link href="profile/new-organization">
                <DropdownMenuItem>
                  <Building2Icon className="mr-2 h-4 w-4" />
                  <span>Kurumsal Profil</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <Table productGroupData={productGroupData} />
    </>
  );
}
