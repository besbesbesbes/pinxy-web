// import React, { useState } from 'react';
// import Login from '../components/Login';
// import Register from '../components/Register';

// function AuthContainer() {
//     const [isLogin, setIsLogin] = useState(true);

//     const toggleComponent = () => {
//         setIsLogin(!isLogin);
//     };

//     return (
//         <div>
//             <div
//                 className={`transition-transform duration-1000 transform ${isLogin ? 'rotate-y-0' : 'rotate-y-180'
//                     } w-full h-full bg-white rounded-xl shadow-lg`}>

//                 {/* ด้านหน้า */}
//                 <div className={`absolute w-full h-full backface-hidden ${isLogin ? '' : 'hidden'}`}>
//                     <Login />
//                 </div>

//                 {/* ด้านหลัง */}
//                 <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${isLogin ? 'hidden' : ''}`}>
//                     <Register />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AuthContainer;

import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleComponent = () => {
    setIsLogin(!isLogin);
  };

<<<<<<< HEAD
    return (
        <div>
            {/* วิดีโอพื้นหลัง */}
            <video
                autoPlay
                loop
                muted
                playsInline
                src="asset/pinxy4.mp4"
                className="absolute inset-0 w-full h-full object-cover z-0"
            ></video>
=======
  return (
    <div>
      {/* วิดีโอพื้นหลัง */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="asset/pinxy2.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      ></video>
>>>>>>> dev

      {/* ตัวกรองพื้นหลัง (optional) */}
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>

      {/* คอนเทนต์ */}
      <div className="relative z-20 flex items-center  justify-end w-full h-screen">
        <div
          className={`transition-transform duration-1000 transform ${
            isLogin ? "rotate-y-0" : "rotate-y-180"
          } w-1/2 h-full flex items-center justify-center`}
        >
          {/* ด้านหน้า */}
          <div
            className={`absolute ml-64 lg:ml-28 w-9/12 h-3/4 backface-hidden flex justify-center items-center ${
              isLogin ? "" : "hidden"
            }`}
          >
            <div className="flex justify-evenly flex-col w-2/3 h-full bg-white bg-opacity-60 shadow-lg p-10 rounded-3xl">
              <Login />
              <div className="text-base flex gap-1 justify-center">
                Don't have an account?
                <button
                  onClick={toggleComponent}
                  className="underline hover:text-my-prim font-bold"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* ด้านหลัง */}
          <div
            className={`absolute ml-64 lg:ml-36 w-9/12 h-full backface-hidden flex justify-center items-center rotate-y-180 ${
              isLogin ? "hidden" : ""
            }`}
          >
            <div className="flex justify-evenly flex-col w-2/3 h-full lg:h-5/6 lg:w-3/4 bg-white bg-opacity-60 shadow-lg p-10 rounded-3xl">
              <Register />
              <div className=" flex text-lg gap-1 justify-center">
                Already have an account?
                <button
                  onClick={toggleComponent}
                  className="underline hover:text-my-prim font-bold"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
