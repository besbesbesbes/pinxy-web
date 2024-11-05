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
import useUserStore from './stores/userStore';
import { getProfile } from './api/userProfile';
import {
  getAllPost,
  getAllPostByCategory,
  getAllPostByValue,
  getAllPostByUserId,
} from "./api/search";
import useStore from "./stores/geoStore";


const Pinxy = () => {

  const user = useUserStore((state) => state.user)
  const { id } = user
  console.log("user", user)
  const [profileData, setProfileData] = useState({})
  const [posts, setPosts] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ]);

  const [followers, setFollowers] = useState([
    { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/40" },
  ]);

  const [distance, setDistance] = useState(5000);
  const [content, setContent] = useState("");
  const [sortOption, setSortOption] = useState("distance");
  const [orderOption, setOrderOption] = useState("asc");
  const [categoryOption, setCategoryOption] = useState("");
  const [userId, setUserId] = useState(null);

  const userPosition = useStore((state) => state.userPosition);
  const updateUserPosition = useStore((state) => state.updateUserPosition);

  useEffect(() => {
    getProfileData(id)

    if (categoryOption) {
      handleGetAllPostByCategory();
    } else {
      handleGetAllPost();
    }
  }, [categoryOption, userPosition, distance, sortOption, orderOption]);

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
      const resp = await getProfile(id)
      setProfileData(resp.data)

    } catch (err) {
      console.log(err)
    }
  }
  console.log("ProfileData", profileData)
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
        <Sidebar setCategoryOption={setCategoryOption} />
      <main className="flex-1 ml-64">
        {" "}
        {/* Adjust margin-left for sidebar and padding-top for navbar */}
        <div className="max-w-full mx-auto px-4">
          <header className="sticky top-0 z-10 mb-8">
            {" "}
            {/* Make header sticky */}
            <Navbar
              setCategoryOption={setCategoryOption}
              handleGetAllPostByValue={handleGetAllPostByValue}
            />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <ProfileCard profileData={profileData} />
              {userId && <ProfileBio />}
              <Post_form
              />
              <PostFilters
                sortOption={sortOption}
                setSortOption={setSortOption}
                orderOption={orderOption}
                setOrderOption={setOrderOption}
              />
              <div className="space-y-2">
                {/* {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))} */}
                {posts.map((post) => (
                  <div key={post.id}>Post ID: {post.postId}</div>
                ))}
              </div>
            </div>

            {/* Fixed Sidebar Content */}
            <div className="lg:col-span-1 sticky top-4 h-[calc(100vh-8rem)] overflow-y-auto">
              {" "}
              {/* Adjust height */}
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
