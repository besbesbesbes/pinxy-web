import React from 'react'
import { ShieldX, ShieldCheck } from 'lucide-react';
import { banUser, unbanUser } from '../../api/user';

const UserList = ({ ListUser, setUserList, searchText }) => {

    const hdlBanUser = async (id) => {
        const response = await banUser(id);
        let newValue = [];
        if (!searchText) {
            newValue = ListUser.filter(item => item.id !== response.data.id);
        } else {
            newValue = ListUser.map(item => item.id === response.data.id ? response.data : item);
        }
        setUserList(newValue);
    };

    const hdlUnbanUser = async (id) => {
        const response = await unbanUser(id);
        let newValue = [];
        if (!searchText) {
            newValue = ListUser.filter(item => item.id !== response.data.id);
        } else {
            newValue = ListUser.map(item => item.id === response.data.id ? response.data : item);
        }
        setUserList(newValue);
    };

    return (
        <div className="space-y-4">
            {ListUser && ListUser.map((item) => (
                <div key={item.id} className="border rounded-lg shadow-md p-4 bg-white">
                    <div className="flex items-center space-x-4">
                        <img 
                            src={item.imageUrl} 
                            alt={`${item.displayName}'s profile`} 
                            className="w-16 h-16 bg-gray-200 rounded-full object-cover border border-gray-300" 
                        />
                        <div className="flex-grow">
                            <h1 className="text-lg font-semibold">{item.displayName}</h1>
                            <p className="text-sm text-gray-500">{item.name}</p>
                        </div>
                        <div className="flex items-center">
                            {item.isBanned ? (
                                <button 
                                    onClick={() => hdlUnbanUser(item.id)} 
                                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 space-x-1 transition"
                                >
                                    <ShieldCheck size={20} />
                                    <span>UNBAN</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => hdlBanUser(item.id)} 
                                    className="flex items-center bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 space-x-1 transition"
                                >
                                    <ShieldX size={20} />
                                    <span>BAN</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
