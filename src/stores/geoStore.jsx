// geoStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  userPosition: [13.7563, 100.5018], // ค่าเริ่มต้นที่กรุงเทพฯ
  // setUserPosition: (position) => set({ userPosition: position }),

  // ฟังก์ชันที่เรียกตำแหน่งของผู้ใช้จาก navigator
  updateUserPosition: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          set({ userPosition: [latitude, longitude] }); // อัปเดตตำแหน่ง
        },
        (err) => {
          console.error("Geolocation error:", err.message); // จัดการ error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },
  postLocation: [],
  setPostLocation: (newVal) => set({ postLocation: newVal }),
}));

export default useStore;
