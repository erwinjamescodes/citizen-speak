import { create } from "zustand";
import moment from "moment";

const useFilterStore = create((set) => ({
  categoryFilter: [],
  setCategoryFilter: (category) =>
    set((state) => ({ categoryFilter: [...state.categoryFilter, category] })),
  removeCategoryFilter: (category) =>
    set((state) => ({
      categoryFilter: state.categoryFilter.filter((cat) => cat !== category),
    })),
  resetCategoryFilter: () => {
    set(() => ({ categoryFilter: [] }));
  },

  startDate: "2023-01-01",
  endDate: moment(new Date()).format("YYYY-MM-DD"),
  setStartDate: (date) => set(() => ({ startDate: date })),
  setEndDate: (date) => set(() => ({ endDate: date })),
  resetStartDate: () => {
    set((state) => ({ startDate: "2023-01-01" }));
  },
  resetEndDate: () => {
    set((state) => ({ endDate: moment(new Date()).format("YYYY-MM-DD") }));
  },
}));

export default useFilterStore;
