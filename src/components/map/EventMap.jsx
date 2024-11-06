import React, { useState, useEffect } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useStore from '../../stores/geoStore';
import UserLocationUpdater from './UserLocationUpdater';
import MapModal from './MapModal';
import LandmarkMap from './LandmarkMap'; // นำเข้า LandmarkMap

const EventMap = ({ posts, distance, setDistance,landmarks }) => {
  const { userPosition, updateUserPosition } = useStore();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateUserPosition(); // Update position on mount
  }, [updateUserPosition]);

  useEffect(() => {
    console.log("User Position:", userPosition); // Log user position to console
  }, [userPosition]);

  return (
    <div className="bg-white rounded-lg p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Map</h4>
      
      {/* Icon button to open the modal */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-blue-500 text-white p-3 rounded-full mb-4 hover:bg-blue-600 transition"
      >
        <FaSearchPlus size={24} /> {/* Use the magnifying glass icon */}
      </button>

      <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer
  center={userPosition}
  zoom={19}
  className="h-full w-full"
  zoomControl={false}
  scrollWheelZoom={false}
  dragging={false}
  touchZoom={false}
  doubleClickZoom={false}
  keyboard={false}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
  />
  <Marker position={userPosition}>
    <Popup>
      <h3 className="font-bold">Your Location</h3>
    </Popup>
  </Marker>

  {/* แสดง LandmarkMap */}
  <LandmarkMap landmarks={landmarks} />

  {/* Show posts as markers on the map */}
  {posts.map((post) => {
    if (post.latitude && post.longitude) {
      return (
        <Marker key={post.id} position={[post.latitude, post.longitude]}>
          <Popup>
            <h3 className="font-bold">{post.author}</h3>
            <p>{post.content}</p>
          </Popup>
        </Marker>
      );
    }
    return null;
  })}

  <UserLocationUpdater userPosition={userPosition} />
</MapContainer>
      </div>

      {/* Render MapModal using Portal */}
      <MapModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userPosition={userPosition} 
        posts={posts} 
      />

      {error && <p className="text-red-600">{error}</p>}

      {/* Filter by Distance */}
      <div className="bg-white rounded-lg p-6 mb-6 w-full">
        <h4 className="text-xl font-bold mb-4">Filter by Distance</h4>
        <input
          type="range"
          min="500"
          max="2000"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full"
        />
        <p className="text-gray-600 text-center mt-2">{distance} meters</p>
      </div>
    </div>
  );
};

export default EventMap;
