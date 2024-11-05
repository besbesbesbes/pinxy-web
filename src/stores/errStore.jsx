import { create } from "zustand";
const useErrStore = create((set) => ({
  errTxt: "",
  setErrTxt: (newVal) => set({ errTxt: newVal }),
}));

export default useErrStore;
