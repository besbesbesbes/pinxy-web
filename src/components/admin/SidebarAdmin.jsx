import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CloudFog, UserRoundPen, FolderCog, Power } from 'lucide-react';
import useUserStore from '../../stores/userStore';

const SidebarAdmin = () => {
    const [swicth , setSwitch] = useState(true)
    const logout = useUserStore((state) => state.logout);
    const location = useLocation()
    const hdlSwitch = () => {
        setSwitch(!swicth)
    }

    return (
        <div className="bg-blue-50 w-64 text-gray-700 flex flex-col h-screen shadow-lg">
            {/* Logo Section */}
            <div className="h-28 bg-blue-300 flex items-baseline p-3 justify-center">
                <img src="/src/assets/Pinxy.png" alt="Logo" className="h-20 w-auto" />

                <div className=' flex'>
                    <h1 className=' text-3xl font-bold text-my-acct'>I</h1>
                    <h1 className='text-3xl font-bold text-my-acct'>N</h1>
                    <h1 className='text-3xl font-bold text-my-prim'>X</h1>
                    <h1 className='text-3xl font-bold text-my-prim'>Y</h1>
                </div>


            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-8 space-y-6">
                <NavLink
                    onClick={hdlSwitch}
                    to="/admin/usermanage"
                    ends
                    className={(swicth && location.pathname === '/admin/usermanage')
                            ? 'bg-blue-200 text-blue-600 font-bold rounded-md flex px-4 py-2 items-center shadow-md transition-colors duration-200'
                            : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200'
                        }
                >
                    <UserRoundPen className="mr-3 text-blue-600" />
                    User Management
                </NavLink>

                <NavLink
                    onClick={hdlSwitch }
                    to="/admin"
                    className={(!swicth && location.pathname === '/admin')
                           ? 'bg-blue-200 text-blue-600 font-bold rounded-md flex px-4 py-2 items-center shadow-md transition-colors duration-200'
                            : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200'
                    }
                >
                    <FolderCog className="mr-3 text-blue-600" />
                    Post Management
                </NavLink>
            </nav>

            {/* Logout Button */}
            <div className="px-4 mb-6">
                <div
                    onClick={() => logout()}
                    className="w-full"
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-red-500 text-white font-bold rounded-md flex px-4 py-2 items-center shadow-lg transition-all duration-200'
                                : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md'
                        }
                    >
                        <Power className="mr-3 text-gray-50" />
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SidebarAdmin;
