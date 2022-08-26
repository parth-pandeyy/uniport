import create from "zustand";
import { combine } from "zustand/middleware";

// local store to keep track of the state of the sidenavbar
// i.e. (open or closed)
export const useSideNavStore = create(
	combine({
		status: false
	},
		set => ({
			toggleSideNavStatus: () => set((state: any) => ({ status: !state.status })),
			close: () => set({ status: false })
		})
	)
);

