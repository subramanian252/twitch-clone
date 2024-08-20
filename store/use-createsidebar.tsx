import React from "react";
import { create } from "zustand";

interface useCreateSidebar {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreateSidebar = create<useCreateSidebar>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));
