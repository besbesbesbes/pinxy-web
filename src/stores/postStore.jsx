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
  postForAI: [],
  addPostForAI: (newVal) =>
    set((state) => ({
      postForAI: [...state.postForAI, newVal],
    })),
  clearPostForAI: () => set({ postForAI: [] }),
  aiSummaryTrigger: false,
  setAiSummaryTrigger: (newVal) => set({ aiSummaryTrigger: newVal }),
  aiAskmeTrigger: false,
  setAiAskmeTrigger: (newVal) => set({ aiAskmeTrigger: newVal }),
  isRenderPostNew: false,
  SetIsRenderPostNew: (newVal) => set({ isRenderPostNew: newVal }),
  isRenderPostEdit: false,
  SetIsRenderPostEdit: (newVal) => set({ isRenderPostEdit: newVal }),
  selectedUser: null,
  setSelectedUser: (newVal) => set({ selectedUser: newVal }),
  bioUser: {},
  setBioUser: (newVal) => set({ bioUser: newVal }),
  activeMenu: "Home",
  setActiveMenu: (newVal) => set({ activeMenu: newVal }),
  isRenderFollower: false,
  setIsRenderFollower: (newVal) => set({ isRenderFollower: newVal }),
  isRenderProfileCard: false,
  setIsRenderProfileCard: (newVal) => set({ isRenderProfileCard: newVal }),
}));

export default usePostStore;
