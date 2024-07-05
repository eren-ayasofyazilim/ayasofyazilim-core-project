"use client";

import type { ReactNode} from "react";
import { createContext, useContext, useState } from "react";

const permissionContext = createContext<any>({});

export const usePermission = () => {
    return useContext(permissionContext);
};

export function PermissionProvider({ children }: { children: ReactNode }) {
    const [permission, setPermission] = useState<string | Object>();

    return (
        <permissionContext.Provider value={{ permission, setPermission }}>
            {children}
        </permissionContext.Provider>
    );
}
