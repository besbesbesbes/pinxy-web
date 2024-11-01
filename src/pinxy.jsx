import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import EventMap from './components/EventMap';
import { SearchUser, DistanceFilter } from './components/Filters';
import FollowBar from './components/FollowBar';

const pinxy = () => {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: 'Alice', 
      username: 'alice', 
      content: 'Excited for the weekend!', 
      likes: 10, 
      comments: 2, 
      shares: 1, 
      latitude: 40.73061, 
      longitude: -73.935242 
    },
    { 
      id: 2, 
      author: 'Bob', 
      username: 'bob', 
      content: 'New café in town!', 
      likes: 20, 
      comments: 5, 
      shares: 3, 
      latitude: 40.712776, 
      longitude: -74.005974 
    },
  ]);

  const [followers, setFollowers] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
  ]);

  const [distance, setDistance] = useState(1000);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      author: 'You',
      username: 'you',
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      latitude: 40.73061,
      longitude: -73.935242
    };
    setPosts([newPost, ...posts]);
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">Happening</h1>
            <SearchBar />
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileCard name="John Doe" username="johndoe" />
            <PostForm handleSubmit={handleSubmit} content={content} setContent={setContent} />
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <EventMap posts={posts} />
            <DistanceFilter distance={distance} setDistance={setDistance} />
            <SearchUser />
            <FollowBar followers={followers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default pinxy;