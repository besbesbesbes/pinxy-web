import React from 'react';
import { ShieldX, ShieldCheck } from 'lucide-react';
import { banPost, unBanPost, gotoApprovePost, gotoRejectPost } from '../../api/user';

const PostList = ({ ListPost, setPostList, searchText }) => {
  const hdlBanPost = async (id) => {
    try {
      const response = await banPost(id);
      let newValue = [];
      if (!searchText) {
        newValue = ListPost.filter(item => item.id !== response.data.id);
      } else {
        newValue = ListPost.map(item => item.id === response.data.id ? response.data : item);
      }
      setPostList(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUnBanPost = async (id) => {
    try {
      const response = await unBanPost(id);
      let newValue = [];
      if (!searchText) {
        newValue = ListPost.filter(item => item.id !== response.data.id);
      } else {
        newValue = ListPost.map(item => item.id === response.data.id ? response.data : item);
      }
      setPostList(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlReject = async (id) => {
    const response = await gotoRejectPost(id);
    let newValue = [];
    if (!searchText) {
      newValue = ListPost.filter(item => item.id !== response.data.id);
    } else {
      newValue = ListPost.map(item => item.id === response.data.id ? response.data : item);
    }
    setPostList(newValue);
  };

  const hdlApprovePost = async (id) => {
    const response = await gotoApprovePost(id);
    let newValue = [];
    if (!searchText) {
      newValue = ListPost.filter(item => item.id !== response.data.id);
    } else {
      newValue = ListPost.map(item => item.id === response.data.id ? response.data : item);
    }
    setPostList(newValue);
  };

  return (
    <div className="space-y-4 p-4">
      {ListPost && ListPost.map((item) => (
        <div key={item.id} className="border rounded-lg shadow-lg p-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
              <img src={item.user.imageUrl} alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{item.user.displayName}</h1>
              <p className="text-sm text-gray-600">{item.user.name}</p>
            </div>
          </div>

          <div className="py-2">
            <p>{item.content}</p>
          </div>

          {item.images.length > 0 ? (
            item.images.map((img, idx) => (
              <div key={idx} className="mt-2">
                <img src={img.imageUrl} alt="" className="w-full h-40 object-cover rounded-md" />
              </div>
            ))
          ) : (
            <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}

          <div className="mt-4 flex space-x-3">
            {item.status === "READY" && (
              <button
                onClick={() => hdlBanPost(item.id)}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                <ShieldX className="mr-1" /> Ban
              </button>
            )}
            {item.status === "WAITING" && (
              <>
                <button
                  onClick={() => hdlReject(item.id)}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  <ShieldX className="mr-1" /> Reject
                </button>
                <button
                  onClick={() => hdlApprovePost(item.id)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  <ShieldCheck className="mr-1" /> Approve
                </button>
              </>
            )}
            {item.status === "REJECTED" && (
              <button
                onClick={() => hdlApprovePost(item.id)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <ShieldCheck className="mr-1" /> Approve
              </button>
            )}
            {item.status === "BANNED" && (
              <button
                onClick={() => hdlUnBanPost(item.id)}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                <ShieldCheck className="mr-1" /> Unban
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
