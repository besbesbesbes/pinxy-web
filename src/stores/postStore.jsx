import { create } from "zustand";
const usePostStore = create((set) => ({
  curPostId: null,
  setCurPostId: (newVal) => set({ curPostId: newVal }),
  reloadPost: false,
  setReloadPost: (newVal) => set({ reloadPost: newVal }),
  curCommentId: null,
  setCurCommentId: (newVal) => set({ curCommentId: newVal }),
  curUserId: null,
  setCurUserId: (newVal) => set({ curUserId: newVal }),
  files: [],
  setFiles: (newVal) => set({ files: newVal }),
}));

export default usePostStore;
