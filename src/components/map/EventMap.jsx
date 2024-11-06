import React, { useState, useEffect, useRef } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import useStore from '../../stores/geoStore';
import UserLocationUpdater from './UserLocationUpdater';
import MapModal from './MapModal';
import LandmarkMap from './LandmarkMap';

const EventMap = ({ posts, distance, setDistance, landmarks }) => {
  const { userPosition, updateUserPosition, setPostLocation, postLocation } = useStore();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapClickPosition, setMapClickPosition] = useState(null);  // ใช้เก็บตำแหน่งคลิกที่แผนที่

  const mapRef = useRef(null);  // ใช้สำหรับเก็บแผนที่อ้างอิง

  useEffect(() => {
    updateUserPosition(); // Update position on mount
  }, [updateUserPosition]);

  useEffect(() => {
    console.log("User Position:", userPosition); // Log user position to console
  }, [userPosition]);

  // เมื่อ postLocation เปลี่ยนแปลงให้ทำการอัปเดตแผนที่
  useEffect(() => {
    if (postLocation.length > 0 && mapRef.current) {
      mapRef.current.flyTo(postLocation, 18);  // เรียก flyTo() เพื่อให้แผนที่ขยับไปตำแหน่งที่ใหม่
    }
  }, [postLocation]);

  // Handle mouse enter and leave for each post
  const handleMouseEnter = (post) => {
    setPostLocation([post.latitude, post.longitude]);  // ตั้งค่า postLocation เมื่อเลื่อนเมาส์
  };

  const handleMouseLeave = () => {
    setPostLocation(userPosition); // รีเซ็ตกลับไปยังตำแหน่งของผู้ใช้
  };

  // สร้าง hook สำหรับการคลิกแผนที่
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMapClickPosition(e.latlng); // ตั้งค่าตำแหน่งที่คลิก
      }
    });
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Map</h4>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={postLocation.length > 0 ? postLocation : userPosition}
          zoom={19}
          className="h-full w-full"
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          keyboard={false}
          ref={mapRef}  // เก็บการอ้างอิงของแผนที่
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
          <LandmarkMap landmarks={landmarks} posts={posts} />

          {/* Show posts as markers on the map */}
          {posts.map((post) => {
            if (post.latitude && post.longitude) {
              return (
                <Marker 
                  key={post.id} 
                  position={[post.latitude, post.longitude]}
                  onMouseEnter={() => handleMouseEnter(post)} 
                  onMouseLeave={handleMouseLeave}
                >
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

          {/* Add MapClickHandler to the map */}
          <MapClickHandler />

        </MapContainer>
      </div>

      {/* Render MapModal using Portal */}
      {mapClickPosition && (
        <MapModal 
          isOpen={true} 
          onClose={() => setMapClickPosition(null)}  // Close the modal when clicking close button
          userPosition={userPosition} 
          posts={posts} 
          mapClickPosition={mapClickPosition}  // Pass clicked position to modal
        />
      )}

      {error && <p className="text-red-600">{error}</p>}

      {/* Filter by Distance */}
      <div className="bg-white rounded-lg p-6 mb-6 w-full">
        <h4 className="text-xl font-bold mb-4">Filter by Distance</h4>
        <input
          type="range"
          min="500"
          max="2000"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);  // Update distance state
            const zoomLevel = Math.min(18, Math.max(10, 18 - Math.floor(e.target.value / 500)));
            if (mapRef.current) {
              mapRef.current.setZoom(zoomLevel);  // Update map zoom based on the distance
            }
          }}
          className="w-full"
        />
        <p className="text-gray-600 text-center mt-2">{distance} meters</p>
      </div>
    </div>
  );
};

export default EventMap;
