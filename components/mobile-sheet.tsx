"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, type LucideIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export type MobileSheetItem = {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  content: ReactNode;
};

export default function MobileSheetDock({ items }: { items: MobileSheetItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = items.find((item) => item.id === activeId);

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem]);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-3 bottom-3 z-[70] grid grid-cols-2 gap-2 rounded-[24px] border border-black/8 bg-[var(--card)]/88 p-2 shadow-[0_18px_55px_rgba(0,0,0,.18)] backdrop-blur-2xl">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveId(id)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--soft)] text-[11px] font-black text-[var(--foreground)] transition active:scale-[.98]"
          >
            <Icon className="size-4 text-[#6f9738]" />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="absolute inset-x-2 bottom-2 max-h-[82dvh] overflow-hidden rounded-t-[30px] rounded-b-[22px] border border-black/8 bg-[var(--paper)] shadow-[0_-24px_80px_rgba(0,0,0,.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/7 bg-[var(--paper)]/92 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-2xl bg-[var(--soft)] text-[#6f9738]">
                    <activeItem.icon className="size-4" />
                  </span>
                  <strong className="text-sm font-black">{activeItem.title}</strong>
                </div>
                <button type="button" onClick={() => setActiveId(null)} className="grid size-9 place-items-center rounded-2xl bg-[var(--soft)]" aria-label="بستن پنجره">
                  <X className="size-4" />
                </button>
              </div>
              <div className="max-h-[calc(82dvh-64px)] overflow-y-auto p-3 pb-6 overscroll-contain">
                {activeItem.content}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
