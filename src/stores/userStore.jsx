import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: (authData) => {
        console.log("authData", authData)
        set({ token: authData.data.token, user: { name: authData.data.payload.name, role: authData.data.payload.role, isBanned: authData.data.payload.isBanned } });
      },
      logout: ()=>{
        set({token:"",user:null})
      }
    }),
    {
      name: "userState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
