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

export interface Role {
  name: string;
  id: string;
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

export const fetchRoles = async (): Promise<Role[]> => {
  try {
    const response = await fetch(getBaseLink("api/admin/role"));
    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch roles", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const fetchUsersForUnit = async (unitId: string): Promise<User[]> => {
  try {
    const response = await fetch(
      getBaseLink(`api/organization/organizationUser?id=${unitId}`)
    );
    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch users for unit", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users for unit:", error);
    return [];
  }
};

export const fetchRolesForUnit = async (unitId: string): Promise<Role[]> => {
  try {
    const response = await fetch(
      getBaseLink(`api/organization/organizationRole?id=${unitId}`)
    );
    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch roles for unit", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles for unit:", error);
    return [];
  }
};
