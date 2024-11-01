import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStore from '../stores/geoStore';

const UserLocationUpdater = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView(userPosition, 19); // อัปเดตตำแหน่งแผนที่
    }
  }, [userPosition, map]);

  return null;
};

const EventMap = ({ posts, distance, setDistance }) => {
  const { userPosition, updateUserPosition } = useStore(); // ใช้ store

  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("User Position:", userPosition); // แสดงตำแหน่งผู้ใช้ในคอนโซล
  }, [userPosition]);

  useEffect(() => {
    updateUserPosition(); // เรียกฟังก์ชัน updateUserPosition เพื่ออัปเดตตำแหน่ง
  }, [updateUserPosition]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <h4 className="text-xl font-bold mb-4">Map</h4>
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
      {error && <p className="text-red-600">{error}</p>}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
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
