import { GlobalFetch } from "./fetch";

export async function getTableData<T>(
  fetchLink: string,
  page: number,
  filter?: string,
) {
  const url = `${fetchLink}?page=${page}&filter=${filter}`;
  const data = await GlobalFetch<T>({
    url,
    showSuccessToast: false,
  });
  return data;
}
export async function deleteTableRow<T>(
  fetchLink: string,
  row: { id: string },
) {
  const data = await GlobalFetch<T>({
    url: fetchLink,
    options: {
      method: "DELETE",
      body: JSON.stringify(row.id),
    },
    showSuccessToast: true,
  });
  return data;
}
