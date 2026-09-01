"use client";

import type { ReactNode } from "react";
import { useReservation } from "@/components/ReservationProvider";

export default function ReserveButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openReservation } = useReservation();

  return (
    <button type="button" onClick={openReservation} className={className}>
      {children}
    </button>
  );
}
