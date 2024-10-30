import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: (role) => {
        set({ token: "FAKETOKEN", user: { name: "fakeuser", role: role } });
      },
    }),
    {
      name: "userState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
