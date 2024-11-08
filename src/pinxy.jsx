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
import { motion, AnimatePresence } from "framer-motion";
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
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([
    { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/40" },
  ]);

  const [profileData, setProfileData] = useState({})
  const [distance, setDistance] = useState(5000);
  const [content, setContent] = useState("");
  const [sortOption, setSortOption] = useState("distance");
  const [orderOption, setOrderOption] = useState("asc");
  const [categoryOption, setCategoryOption] = useState("");
  const [userId, setUserId] = useState(null);

  const userPosition = useStore((state) => state.userPosition);
  const updateUserPosition = useStore((state) => state.updateUserPosition);
  const clearPostForAI = usePostStore((state) => state.clearPostForAI);

  useEffect(() => {
    getProfileData(id)
  }, [])

  const getProfileData = async (id) => {
    try {
      const resp = await getProfile(id)
      setProfileData(resp.data.profileData)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
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
  console.log('profileData', profileData)
  return (
    <div className="min-h-screen bg-my-bg-main flex">
      <Sidebar setCategoryOption={setCategoryOption} profileData={profileData} />
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
              <ProfileCard />
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
