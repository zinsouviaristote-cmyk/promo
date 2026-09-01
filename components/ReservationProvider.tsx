"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type ReservationContextValue = {
  isOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
  /** À appeler une fois l'animation de sortie de la modale terminée. */
  restoreFocus: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openReservation = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const closeReservation = useCallback(() => {
    setIsOpen(false);
  }, []);

  const restoreFocus = useCallback(() => {
    triggerRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({ isOpen, openReservation, closeReservation, restoreFocus }),
    [isOpen, openReservation, closeReservation, restoreFocus]
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useReservation doit être utilisé dans ReservationProvider");
  }
  return ctx;
}
