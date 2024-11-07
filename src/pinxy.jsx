import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import EventMap from "./components/map/EventMap";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllPost,
  getAllPostByCategory,
  getAllPostByValue,
  getAllPostByUserId,
  getFollowingApi,
} from "./api/search";
import useStore from "./stores/geoStore";

const Pinxy = () => {
  const user = useUserStore((state) => state.user);
  const inputRef = useRef(); // ใช้ useRef สำหรับเก็บค่า input

  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [landmarks, setLandmarks] = useState([]); // เพิ่ม state สำหรับ landmarks

  const [distance, setDistance] = useState(1000); // Distance filter
  const [content, setContent] = useState("");
  const [sortOption, setSortOption] = useState("distance");
  const [orderOption, setOrderOption] = useState("asc");
  const [categoryOption, setCategoryOption] = useState("");
  const [value, setValue] = useState("");

  const userPosition = useStore((state) => state.userPosition);
  const updateUserPosition = useStore((state) => state.updateUserPosition);
  const clearPostForAI = usePostStore((state) => state.clearPostForAI);
  const addPostForAI = usePostStore((state) => state.addPostForAI);
  const selectedUser = usePostStore((state) => state.selectedUser);

  useEffect(() => {
    handleGetFollowing(user.id);
    if (categoryOption) {
      handleGetAllPostByCategory();
    } else if (value) {
      handleGetAllPostByValue(value);
    } else if (selectedUser) {
      handleGetAllPostByUserId(selectedUser);
    } else {
      handleGetAllPost();
    }
  }, [categoryOption, userPosition, distance, sortOption, orderOption, value, selectedUser]);

  useEffect(() => {
    clearPostForAI();
    if (posts) {
      posts.map((el) => {
        addPostForAI(el.content);
      });
    }
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

  const handleGetAllPostByUserId = async (selectedUser) => {
    try {
      const resp = await getAllPostByUserId({
        current_location_lat: userPosition[0],
        current_location_lng: userPosition[1],
        distance,
        sort: sortOption,
        order: orderOption,
        userId: selectedUser,
      });
      setPosts(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLandmarks = async () => {
    // ดึงข้อมูล landmarks จาก API หรือแหล่งข้อมูล
    try {
      const response = await fetch("/api/landmarks");
      const data = await response.json();
      setLandmarks(data); // ตั้งค่า landmarks
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetFollowing = async (userId) => {
    try {
      const resp = await getFollowingApi({
        userId: userId,
      });
      setFollowers(resp.data.following);
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="min-h-screen bg-my-bg-main flex">
      <Sidebar
        setCategoryOption={setCategoryOption}
        inputRef={inputRef}
        setValue={setValue}
      />
      <main className="flex-1 ml-64">
        <div className="max-w-full mx-auto px-4">
          {/* <header className="sticky top-0 z-10"></header> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <Navbar
                inputRef={inputRef}
                setValue={setValue}
                setCategoryOption={setCategoryOption}
                handleGetAllPostByValue={handleGetAllPostByValue}
              />
              <Post_form />
              {/* <ProfileBio /> */}
              <ProfileCard
                handleGetAllPostByUserId={handleGetAllPostByUserId}
              />
              <PostFilters
                sortOption={sortOption}
                setSortOption={setSortOption}
                orderOption={orderOption}
                setOrderOption={setOrderOption}
              />
              <div className="space-y-2">
                <AnimatePresence>
                  {posts.map((post, idx) => (
                    <motion.div
                      key={post.postId}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Post_post postId={post.postId} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="lg:col-span-1 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="space-y-2">
                {/* ส่ง landmarks ไปที่ EventMap */}
                <EventMap
                  posts={posts}
                  distance={distance}
                  setDistance={setDistance}
                  landmarks={landmarks}
                />
                <SearchUser
                  handleGetAllPostByUserId={handleGetAllPostByUserId}
                />
                <FollowBar followers={followers} setCategoryOption={setCategoryOption} />
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
