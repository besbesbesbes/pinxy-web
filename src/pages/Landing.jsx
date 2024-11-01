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


import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';


function AuthContainer() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleComponent = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='flex flex-row h-screen'>
            {/* LEFT */}
            <div className='w-1/2 bg-pink-100'>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h1>Discover What's Happening near You.</h1>
                </div>
            </div>
            <div className={`transition-transform duration-1000 transform ${isLogin ? 'rotate-y-0' : 'rotate-y-180'
                } w-1/2 `}>

                {/* ด้านหน้า */}
                <div className={`absolute w-full h-full backface-hidden flex justify-center items-center ${isLogin ? '' : 'hidden'}`}>
                    <div className="flex flex-col w-2/3 h-3/4 bg-my-bg-main bg-opacity-60 shadow-lg p-10 rounded-3xl">
                        <Login />
                        <div className="text-base text-center">Don't have an account? <button onClick={toggleComponent} className="underline hover:text-my-prim font-bold">Register</button></div>
                    </div>

                </div>

                {/* ด้านหลัง */}
                <div className={`absolute w-full h-full backface-hidden flex justify-center items-center rotate-y-180 ${isLogin ? 'hidden' : ''}`}>
                    <div className="flex flex-col w-2/3 h-3/4 bg-my-bg-main bg-opacity-60 shadow-lg p-10 rounded-3xl">
                        <Register />
                        <div className="text-base text-center">Already have an account? <button onClick={toggleComponent} className="underline hover:text-my-prim font-bold">Log in</button></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AuthContainer;

