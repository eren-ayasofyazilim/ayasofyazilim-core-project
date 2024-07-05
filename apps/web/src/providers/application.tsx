"use client";

import { createContext, useContext } from "react";

interface IApplicationProviderProps {
  appName: string;
  children: JSX.Element;
}
interface IApplicationContextProps {
  appName: string;
}

export const ApplicationContext = createContext<IApplicationContextProps>({
  appName: "UNIREFUND",
});

export const useApplication = () => {
  return useContext(ApplicationContext);
};

export function ApplicationProvider({
  children,
  appName,
}: IApplicationProviderProps) {
  return (
    <ApplicationContext.Provider value={{ appName }}>
      {children}
    </ApplicationContext.Provider>
  );
}
