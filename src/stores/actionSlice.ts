import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  isSideBarMinimized: boolean;
  setSideBarMinimize: () => void;
  isFullscreenActive: boolean;
  setFullscreenOpen: (callback: () => Promise<void>) => void;
}

export const useActionStore = create<ActionState>()(
  devtools(
    persist(
      (set) => ({
        isSideBarMinimized: true,
        setSideBarMinimize: () =>
          set((state) => ({ isSideBarMinimized: !state.isSideBarMinimized })),
        isFullscreenActive: false,
        setFullscreenOpen: (callback) => {
          callback();
          return set((state) => ({
            isSideBarMinimized: !state.isSideBarMinimized,
          }));
        },
      }),
      {
        name: "action-storage",
      }
    )
  )
);
