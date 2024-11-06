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
  ]);

  const [distance, setDistance] = useState(1000);
  const [content, setContent] = useState("");

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
                ))}
              </div>
            </div>

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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pinxy;