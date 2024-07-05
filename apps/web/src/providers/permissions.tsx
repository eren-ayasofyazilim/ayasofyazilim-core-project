"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const PermissionContext = createContext<any>({});

export const usePermission = () => {
  return useContext(PermissionContext);
};

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] =
    useState<Record<number, Record<string, string>>>();
  return (
    <PermissionContext.Provider value={{ permission, setPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}
