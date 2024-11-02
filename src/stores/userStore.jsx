import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: (role) => {
        set({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNTUyNzI0LCJleHAiOjE3MzMxNDQ3MjR9.EfTD5uMwJxLJMrbfDzAtcmwJSY2q9XtxYalei3KnAPU",
          user: { id: 1, name: "admin", role: role },
        });
      },
    }),
    {
      name: "userState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
