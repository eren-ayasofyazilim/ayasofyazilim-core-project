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
