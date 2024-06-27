import { getBaseLink } from "src/utils";

export interface OrganizationUnit {
  code: string;
  displayName: string;
  id: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
}

export const fetchOrganizationUnits = async (): Promise<OrganizationUnit[]> => {
  try {
    const response = await fetch(getBaseLink("api/admin/organization"));
    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch organization units", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching organization units:", error);
    return [];
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(getBaseLink("api/admin/user"));
    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch users", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
