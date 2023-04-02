import { create } from "zustand";

const useReportsStore = create((set) => ({
  reports: [],
  setReports: (reps) => set((state) => ({ reports: reps })),
  updateReport: (id, newReportData) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? newReportData : report
      ),
    })),
}));

export default useReportsStore;
