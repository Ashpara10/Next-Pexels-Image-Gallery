import { create } from "zustand";

type StoreProps = {
  search: string;
  setQ: (q: string) => void;
};

export const useQueryStore = create<StoreProps>((set) => ({
  search: "interiors",
  setQ: (q: string) => set((state) => ({ search: (state.search = q) })),
}));
