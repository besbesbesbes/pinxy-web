<<<<<<< HEAD
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import EventMap from './components/EventMap';
import { SearchUser } from './components/Filters';
import FollowBar from './components/FollowBar';
import Sidebar from './components/Sidebar';
import PostFilters from './components/PostFilters';
import ProfileBio from './components/ProfileBio';

const Pinxy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice",
      username: "alice",
      content: "Excited for the weekend!",
      likes: 10,
      comments: 2,
      shares: 1,
      latitude: 40.73061,
      longitude: -73.935242,
    },
    {
      id: 2,
      author: "Bob",
      username: "bob",
      content: "New café in town!",
      likes: 20,
      comments: 5,
      shares: 3,
      latitude: 40.712776,
      longitude: -74.005974,
    },
  ]);

  const [followers, setFollowers] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'BOBY SA', avatar: 'https://via.placeholder.com/40' },
=======
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventMap from "./components/EventMap";
import { SearchUser } from "./components/Filters";
import FollowBar from "./components/FollowBar";
import Sidebar from "./components/Sidebar";
import PostFilters from "./components/PostFilters";
import ProfileBio from "./components/ProfileBio";
import Post_form from "./components/Post_form";
import Post_post from "./components/Post_post";
import Modal from "./components/Modal";
import useUserStore from "./stores/userStore";
import ProfileCard from "./components/ProfileCard";
import usePostStore from "./stores/postStore";
import { getProfile } from "./api/userProfile";
import {
  getAllPost,
  getAllPostByCategory,
  getAllPostByValue,
  getAllPostByUserId,
} from "./api/search";
import useStore from "./stores/geoStore";

const Pinxy = () => {
  const user = useUserStore((state) => state.user);
  const { id } = user;
  console.log("user", user);
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([
    { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/40" },
>>>>>>> dev
  ]);

  const [distance, setDistance] = useState(5000);
  const [content, setContent] = useState("");
  const [sortOption, setSortOption] = useState("distance");
  const [orderOption, setOrderOption] = useState("asc");
  const [categoryOption, setCategoryOption] = useState("");
  const [userId, setUserId] = useState(null);

<<<<<<< HEAD
=======
  const userPosition = useStore((state) => state.userPosition);
  const updateUserPosition = useStore((state) => state.updateUserPosition);
  const clearPostForAI = usePostStore((state) => state.clearPostForAI);

  useEffect(() => {
    getProfileData(id);
    if (categoryOption) {
      handleGetAllPostByCategory();
    } else {
      handleGetAllPost();
    }
  }, [categoryOption, userPosition, distance, sortOption, orderOption]);

  useEffect(() => {
    clearPostForAI();
  }, [posts]);

  const handleGetAllPost = async () => {
    try {
      const resp = await getAllPost({
        current_location_lat: userPosition[0],
        current_location_lng: userPosition[1],
        distance,
        sort: sortOption,
        order: orderOption,
      });
      setPosts(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetAllPostByValue = async (searchValue) => {
    try {
      const resp = await getAllPostByValue({
        current_location_lat: userPosition[0],
        current_location_lng: userPosition[1],
        distance,
        sort: sortOption,
        order: orderOption,
        value: searchValue,
      });
      setPosts(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetAllPostByCategory = async () => {
    try {
      const resp = await getAllPostByCategory({
        current_location_lat: userPosition[0],
        current_location_lng: userPosition[1],
        distance,
        sort: sortOption,
        order: orderOption,
        category: categoryOption,
      });
      setPosts(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfileData = async (id) => {
    try {
      const resp = await getProfile(id);
      setProfileData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("ProfileData", profileData);
>>>>>>> dev
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      author: "You",
      username: "you",
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      latitude: 40.73061,
      longitude: -73.935242,
    };
    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative ml-64 pt-16">
        <div className="max-w-full px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              <ProfileBio />
              <PostForm 
                handleSubmit={handleSubmit} 
                content={content} 
                setContent={setContent} 
              />
              <PostFilters />
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
=======
    <div className="min-h-screen bg-my-bg-main flex">
      <Sidebar setCategoryOption={setCategoryOption} />
      <main className="flex-1 ml-64">
        {" "}
        {/* Adjust margin-left for sidebar and padding-top for navbar */}
        <div className="max-w-full mx-auto px-4">
          <header className="sticky top-0 z-10"></header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <div className="lg:col-span-2 space-y-2">
              <Navbar
                setCategoryOption={setCategoryOption}
                handleGetAllPostByValue={handleGetAllPostByValue}
              />
              <Post_form />
              {/* <ProfileBio /> */}
              <PostFilters
                sortOption={sortOption}
                setSortOption={setSortOption}
                orderOption={orderOption}
                setOrderOption={setOrderOption}
              />
              <ProfileCard profileData={profileData} />
              <div className="space-y-2">
                {posts.map((post, idx) => (
                  <Post_post key={idx} postId={post.postId} />
>>>>>>> dev
                ))}
              </div>
            </div>

<<<<<<< HEAD
            {/* Right Sidebar - Updated with wider width */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="fixed right-0 top-16 w-1/4 min-w-[360px] h-screen z-40 bg-gray-100">
                <div className="h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <EventMap 
                      posts={posts} 
                      distance={distance} 
                      setDistance={setDistance} 
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <SearchUser />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <FollowBar followers={followers} />
                  </div>
                </div>
=======
            {/* Fixed Sidebar Content */}
            {/* <div className="lg:col-span-1 sticky top-4 h-[calc(100vh-8rem)] overflow-y-auto "> */}
            <div className="lg:col-span-1 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="space-y-2">
                {/* <EventMap
                  posts={posts}
                  distance={distance}
                  setDistance={setDistance}
                /> */}
                <SearchUser />
                <FollowBar followers={followers} />
>>>>>>> dev
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal />
    </div>
  );
};

export default Pinxy;