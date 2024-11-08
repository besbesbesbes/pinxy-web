import React, { useEffect, useState } from 'react';
import { bannedUser, reportUser, searchTextUser } from '../../api/user';

const FilterUser = ({ setUserList, searchText, setSearchText }) => {
    const [report, setReport] = useState(false);
    const [banned, setBanned] = useState(false);

    const hdlOnClickReport = async () => {
      setSearchText("")
        const newValue = !report;
        setReport(newValue);
        if (newValue) {
            const response = await reportUser();
            setBanned(false);
            setUserList([...response.data]);
        } else {
            setUserList([]);
        }
    };

    const hdlOnClickBan = async () => {
      setSearchText("")
        const newValue = !banned;
        setBanned(newValue);
        if (newValue) {
            const response = await bannedUser();
            setReport(false);
            setUserList([...response.data]);
        } else {
            setUserList([]);
        }
    };

    const hdlSearchUser = async () => {
        const response = await searchTextUser(searchText);
        setReport(false);
        setBanned(false);
        setUserList(response.data);
    };

    useEffect(() => {
        if (searchText) {
            const delay = setTimeout(() => {
                hdlSearchUser();
            }, 300);
            return () => clearTimeout(delay);
        } else {
            setUserList([]);
        }
    }, [searchText]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Search input */}
            <div className="mb-4">
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Users..."
                    className="border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <hr className="my-4" />

            {/* Filters */}
            <div className="space-y-3">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={report}
                        onChange={hdlOnClickReport}
                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-gray-700 font-medium">Reported</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={banned}
                        onChange={hdlOnClickBan}
                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-gray-700 font-medium">Banned</label>
                </div>
            </div>
        </div>
    );
};

export default FilterUser;
