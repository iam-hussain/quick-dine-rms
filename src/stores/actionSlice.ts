import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  isSideBarOpen: boolean;
  setSideBarOpen: () => void;
  isFullscreenActive: boolean;
  setFullscreenOpen: (callback: () => Promise<void>) => void;
}

export const useActionStore = create<ActionState>()(
  devtools(
    persist(
      (set) => ({
        isSideBarOpen: false,
        setSideBarOpen: () =>
          set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
        isFullscreenActive: false,
        setFullscreenOpen: (callback) => {
          callback();
          return set((state) => ({ isSideBarOpen: !state.isSideBarOpen }));
        },
      }),
      {
        name: "action-storage",
      }
    )
  )
);
