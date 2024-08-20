import React from "react";
import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface useChatSideBar {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  variant: ChatVariant;
  onCHangeVariant: (variant: ChatVariant) => void;
}

export const useChatSideBar = create<useChatSideBar>((set) => ({
  variant: ChatVariant.CHAT,
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
  onCHangeVariant: (variant) => set({ variant }),
}));
