"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useReservation } from "@/components/ReservationProvider";
import { useMediaQuery } from "@/lib/use-media-query";
import ReservationForm from "@/components/ReservationForm";

const OPEN_DURATION = 0.2;
const CLOSE_DURATION = 0.15;

export default function ReservationModal() {
  const { isOpen, closeReservation, restoreFocus } = useReservation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  // L'overlay doit être plein (opacité + flou) dès la première frame,
  // pas en fondu : seule la sortie s'anime, rapidement.
  const overlayVariants = {
    hidden: { opacity: 0, transition: { duration: CLOSE_DURATION } },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  // Sur desktop, x/y:-50% recentre la boîte (left-1/2 top-1/2) : ce décalage
  // doit être fourni à `motion` avec le scale, sinon son style inline
  // transform écrase la classe Tailwind -translate-x/y-1/2.
  const contentVariants = isDesktop
    ? {
        hidden: {
          opacity: 0,
          scale: reducedMotion ? 1 : 0.96,
          x: "-50%",
          y: "-50%",
          transition: { duration: CLOSE_DURATION },
        },
        visible: {
          opacity: 1,
          scale: 1,
          x: "-50%",
          y: "-50%",
          transition: { duration: OPEN_DURATION, ease: "easeOut" },
        },
      }
    : {
        hidden: {
          opacity: 0,
          y: reducedMotion ? 0 : "100%",
          transition: { duration: CLOSE_DURATION },
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: OPEN_DURATION, ease: "easeOut" },
        },
      };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeReservation();
      }}
    >
      <AnimatePresence onExitComplete={restoreFocus}>
        {isOpen && (
          <Dialog.Portal forceMount container={typeof document !== "undefined" ? document.body : undefined}>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[100] bg-encre/50 backdrop-blur-sm"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => event.preventDefault()}
              className="fixed z-[100] inset-x-0 bottom-0 md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2"
            >
              <motion.div
                drag={!isDesktop && !reducedMotion ? "y" : false}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={(_event, info) => {
                  if (info.offset.y > 80 || info.velocity.y > 500) {
                    closeReservation();
                  }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="max-h-[85svh] w-full overflow-y-auto rounded-t-card bg-creme p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] shadow-2xl md:max-h-[90svh] md:w-[480px] md:rounded-card md:p-8"
              >
                <div
                  className="mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-sable md:hidden"
                  onPointerDown={(event) => dragControls.start(event)}
                />

                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title className="font-display text-xl font-extrabold text-encre">
                    Réservez votre combo
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Fermer"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-encre/60 transition-colors hover:bg-encre/5 hover:text-encre"
                    >
                      <X className="h-5 w-5" aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Formulaire de réservation du combo Table Thérapeutique.
                </Dialog.Description>

                <ReservationForm autoFocusNom={isDesktop} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
