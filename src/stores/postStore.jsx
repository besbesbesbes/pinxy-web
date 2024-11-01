import { create } from "zustand";
const usePostStore = create((set) => ({
  curPostId: null,
  setCurPostId: (newVal) => set({ curPostId: newVal }),
  reloadPost: false,
  setReloadPost: (newVal) => set({ reloadPost: newVal }),
  curCommentId: null,
  setCurCommentId: (newVal) => set({ curCommentId: newVal }),
}));

export default usePostStore;
