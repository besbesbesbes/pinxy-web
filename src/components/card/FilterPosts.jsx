import React, { useEffect, useState } from 'react';
import { bannedPost, rejectedPost, reportPost, searchTextPost, waitingApprove } from '../../api/user';

const FilterPosts = ({ setPostList, searchText, setSearchText }) => {
    const [report, setReportPost] = useState(false);
    const [waiting, setWaitApprove] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [banned, setBanned] = useState(false);

    const hdlOnClickReport = async () => {
        setSearchText("");
        const newValue = !report;
        setReportPost(newValue);
        if (newValue) {
            const response = await reportPost();
            setWaitApprove(false);
            setRejected(false);
            setBanned(false);
  
            setPostList([...response.data]);
        } else {
            setPostList([]);
        }
    };

    const hdlOnClickBan = async () => {
        setSearchText("");
        const newValue = !banned;
        setBanned(newValue);
        if (newValue) {
            const response = await bannedPost();
            setReportPost(false);
            setWaitApprove(false);
            setRejected(false);
       
            setPostList([...response.data]);
        } else {
            setPostList([]);
        }
    };

    const hdlClickWaitForApprove = async () => {
        setSearchText("");
        const newValue = !waiting;
        setWaitApprove(newValue);
        if (newValue) {
            const response = await waitingApprove();
            setBanned(false);
            setRejected(false);
            setReportPost(false);
      
            setPostList([...response.data]);
        } else {
            setPostList([]);
        }
    };

    const hdlClickRejected = async () => {
        setSearchText("");
        const newValue = !rejected;
        setRejected(newValue);
        if (newValue) {
            const response = await rejectedPost();
            setBanned(false);
            setReportPost(false);
            setWaitApprove(false);
        
            setPostList([...response.data]);
        } else {
            setPostList([]);
        }
    };

    const hdlSearchPost = async () => {
        const response = await searchTextPost(searchText);
        setReportPost(false);
        setBanned(false);
        setWaitApprove(false);
        setRejected(false);
        setPostList(response.data);
    };

    useEffect(() => {
        if (searchText) {
            const delay = setTimeout(() => {
                hdlSearchPost();
            }, 300);
            return () => clearTimeout(delay);
        } else {
            setPostList([]);
        }
    }, [searchText]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Search by text */}
            <div className="mb-4">
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Post..."
                    className="border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <hr className="my-4" />

            {/* Search by category */}
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

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={waiting}
                        onChange={hdlClickWaitForApprove}
                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-gray-700 font-medium">Waiting for approval</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={rejected}
                        onChange={hdlClickRejected}
                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-gray-700 font-medium">Rejected</label>
                </div>
            </div>
        </div>
    );
};

export default FilterPosts;
