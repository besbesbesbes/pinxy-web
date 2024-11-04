import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 ml-64 pt-16"> {/* Adjust margin-left for sidebar and padding-top for navbar */}
        <div className="max-w-full mx-auto px-4">
          <header className="sticky top-0 z-10 mb-8"> {/* Make header sticky */}
            <Navbar />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProfileBio />
              <PostForm handleSubmit={handleSubmit} content={content} setContent={setContent} />
              <PostFilters />
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Fixed Sidebar Content */}
            <div className="lg:col-span-1 sticky top-4 h-[calc(100vh-8rem)] overflow-y-auto"> {/* Adjust height */}
              <div className="space-y-6">
                <EventMap posts={posts} distance={distance} setDistance={setDistance} />
                <SearchUser />
                <FollowBar followers={followers} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pinxy;