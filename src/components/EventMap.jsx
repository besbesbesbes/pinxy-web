import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearchPlus } from 'react-icons/fa'; // Import magnifying glass icon
import useStore from '../stores/geoStore';

const UserLocationUpdater = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView(userPosition, 19); // Update map position
    }
  }, [userPosition, map]);

  return null;
};

const MapModal = ({ isOpen, onClose, userPosition, posts }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={onClose} // Close modal on background click
    >
      <div 
        className="relative w-full h-full max-w-5xl max-h-[90vh] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent close on map click
      >
        <MapContainer
          center={userPosition}
          zoom={19}
          className="h-full w-full"
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
          {posts.map((post) => (
            <Marker key={post.id} position={[post.latitude, post.longitude]}>
              <Popup>
                <h3 className="font-bold">{post.author}</h3>
                <p>{post.content}</p>
              </Popup>
            </Marker>
          ))}
          <UserLocationUpdater userPosition={userPosition} />
        </MapContainer>
      </div>
    </div>,
    document.body // Render modal outside of the root component
  );
};

const EventMap = ({ posts, distance, setDistance }) => {
  const { userPosition, updateUserPosition } = useStore();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("User Position:", userPosition); // Log user position to console
  }, [userPosition]);

  useEffect(() => {
    updateUserPosition(); // Update position on mount
  }, [updateUserPosition]);

  return (
    <div className="bg-white rounded-lg  p-6 mb-6 w-full">
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
          {posts.map((post) => (
            <Marker key={post.id} position={[post.latitude, post.longitude]}>
              <Popup>
                <h3 className="font-bold">{post.author}</h3>
                <p>{post.content}</p>
              </Popup>
            </Marker>
          ))}
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
      <div className="bg-white rounded-lg  p-6 mb-6 w-full">
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
