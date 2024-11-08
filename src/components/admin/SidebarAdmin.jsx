import React from 'react';
import { NavLink } from 'react-router-dom';
import { CloudFog, UserRoundPen, FolderCog, Power } from 'lucide-react';
import useUserStore from '../../stores/userStore';

const SidebarAdmin = () => {
    const logout = useUserStore((state) => state.logout);

    return (
        <div className="bg-blue-100 w-64 text-gray-600 flex flex-col h-screen shadow-lg">
            {/* Logo Section */}
            <div className="h-24 bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                LOGO
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-4">
                <NavLink
                    to="/admin/usermanage"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? ' text-gray-600 font-bold rounded-md flex px-4 py-2 items-center '
                            : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md  '
                    }
                >
                    <UserRoundPen className="mr-2" />
                    User Management
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive
                            ? ' text-gray-600 font-bold rounded-md flex px-4 py-2 items-center '
                            : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md  '
                    }
                >
                    <FolderCog className="mr-2" />
                    Post Management
                </NavLink>
            </nav>

            {/* Logout Button */}
            <div
                onClick={() => {
                    logout();
                }}
                className="mb-4 px-4"
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-red-500 text-white font-bold rounded-md flex px-4 py-2 items-center transition-all duration-200'
                            : 'text-gray-600 font-semibold px-4 py-2 flex items-center rounded-md hover:bg-red-500 hover:text-white transition-all duration-200'
                    }
                >
                    <Power className="mr-2" />
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default SidebarAdmin;
