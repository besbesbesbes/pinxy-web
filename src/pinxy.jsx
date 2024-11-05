import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// import PostCard from "./components/PostCard";
// import PostForm from "./components/PostForm";
import EventMap from "./components/EventMap";
import { SearchUser } from "./components/Filters";
import FollowBar from "./components/FollowBar";
import Sidebar from "./components/Sidebar";
import PostFilters from "./components/PostFilters";
import ProfileBio from "./components/ProfileBio";
import Post_form from "./components/Post_form";
import Post_post from "./components/Post_post";
import Modal from "./components/Modal";

const Pinxy = () => {
  const [posts, setPosts] = useState([
    { id: 168 },
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

  const [distance, setDistance] = useState(1000);
  const [content, setContent] = useState("");

  useEffect(() => {}, []);

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
      <Sidebar />

      <main className="flex-1 ml-64">
        {" "}
        {/* Adjust margin-left for sidebar and padding-top for navbar */}
        <div className="max-w-full mx-auto px-4">
          <header className="sticky top-0 z-10 mb-8">
            {" "}
            {/* Make header sticky */}
            <Navbar />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <ProfileBio />
              <Post_form />
              <PostFilters />
              <div className="space-y-2">
                {posts.map((post, idx) => (
                  <Post_post key={idx} postId={post.id} />
                  // <PostCard key={post.id} post={post} />
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
