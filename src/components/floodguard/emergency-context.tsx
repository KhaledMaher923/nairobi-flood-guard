import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  emergency: boolean;
  setEmergency: (v: boolean) => void;
  toggleEmergency: () => void;
};

const EmergencyContext = createContext<Ctx>({
  emergency: false,
  setEmergency: () => {},
  toggleEmergency: () => {},
});

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [emergency, setEmergency] = useState(false);
  const value = useMemo(
    () => ({ emergency, setEmergency, toggleEmergency: () => setEmergency((v) => !v) }),
    [emergency],
  );
  return <EmergencyContext.Provider value={value}>{children}</EmergencyContext.Provider>;
}

export const useEmergency = () => useContext(EmergencyContext);
