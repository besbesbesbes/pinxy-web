import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import useStore from "../../stores/geoStore";
import UserLocationUpdater from "./UserLocationUpdater";
import LandmarkMap from "./LandmarkMap";

const EventMap = ({ posts, distance, setDistance, landmarks }) => {
  const { userPosition, updateUserPosition, setPostLocation, postLocation } =
    useStore();
  const [error, setError] = useState(null);
  const [isMapPopupOpen, setIsMapPopupOpen] = useState(false); // เปิดปิด Popup
  const [isMapVisible, setIsMapVisible] = useState(true); // การแสดงแผนที่เล็ก
  const [fixZoomLevel, setFixZoomLevel] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const zoomLevelRef = useRef(null); // เก็บค่า zoom level ที่ตั้งไว้จากการปรับระยะ

  useEffect(() => {
    updateUserPosition();
  }, [updateUserPosition]);

  useEffect(() => {
    if (postLocation.length > 0 && mapRef.current) {
      if (userPosition === postLocation) {
        mapRef.current.flyTo(postLocation, fixZoomLevel);
      } else {
        mapRef.current.flyTo(postLocation, 18);
      }
    }
  }, [postLocation]);

  const handleMouseEnter = (post) => {
    setPostLocation([post.latitude, post.longitude]);
    if (mapRef.current) {
      mapRef.current.flyTo([post.latitude, post.longitude], 18); // Zoom in to post location
    }
  };

  const handleMouseLeave = () => {
    setPostLocation(userPosition);
    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevelRef.current); // ใช้ค่า zoom ที่เก็บไว้
      mapRef.current.flyTo(userPosition, zoomLevelRef.current); // กลับไปยังตำแหน่งผู้ใช้
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click() {
        setIsMapPopupOpen(true);
        setIsMapVisible(false); // ซ่อนแผนที่เล็กเมื่อ Popup เปิด
      },
    });
    return null;
  };

  // Close popup on outside click
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsMapPopupOpen(false);
      setIsMapVisible(true); // แสดงแผนที่เล็กเมื่อ Popup ปิด
    }
  };

  // Close popup on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMapPopupOpen(false);
        setIsMapVisible(true); // แสดงแผนที่เล็กเมื่อ Popup ปิด
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${distance} m.`; // Less than 1 km
    } else {
      const kilometers = (distance / 1000).toFixed(1); // Convert to kilometers with 1 decimal place
      return `${kilometers} km.`;
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 w-full flex flex-col gap-2">
      {/* ซ่อนแผนที่เล็กเมื่อ popup เปิดอยู่ */}
      {isMapVisible && (
        <div className="h-[400px] rounded-lg overflow-hidden relative">
          <MapContainer
            center={postLocation.length > 0 ? postLocation : userPosition}
            zoom={zoomLevelRef.current}
            className="h-full w-full"
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={userPosition}>
              <Popup>
                <h3 className="font-bold">Your Location minimap</h3>
              </Popup>
            </Marker>

            <LandmarkMap landmarks={landmarks} posts={posts} />

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
            <MapClickHandler />
          </MapContainer>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <div className="bg-white rounded-lg mt-2 w-full flex gap-2">
        <input
          type="range"
          min="500"
          max="5000"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);
            const zoomLevel = Math.min(
              18,
              Math.max(10, 18 - Math.floor(e.target.value / 500))
            );
            // zoomLevelRef.current = zoomLevel; // เก็บค่า zoom level ไว้ใน ref
            setFixZoomLevel(zoomLevel);
            if (mapRef.current) {
              mapRef.current.setZoom(zoomLevel); // ตั้งค่า zoom โดยตรงที่แผนที่
            }
          }}
          className="flex-1"
        />
        <p className="text-gray-600 text-center w-fit">
          {formatDistance(distance)}
        </p>
      </div>
      {/* Map Popup */}
      {isMapPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="relative w-11/12 h-5/6 bg-white rounded-lg overflow-hidden"
            style={{
              zIndex: 2000, // ให้ Popup อยู่ข้างหน้าของแผนที่
            }}
          >
            <button
              onClick={() => {
                setIsMapPopupOpen(false);
                setIsMapVisible(true); // แสดงแผนที่เล็กเมื่อ Popup ปิด
              }}
              className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
              style={{
                zIndex: 1000, // ปุ่มปิดไว้ข้างหน้า
              }}
            >
              <FaTimes size={24} />
            </button>

            {/* แผนที่ใน Popup */}
            <MapContainer
              center={postLocation.length > 0 ? postLocation : userPosition}
              zoom={18}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
              dragging={true}
              ref={mapRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1, // แผนที่ใน Popup จะอยู่ข้างหลังพื้นหลัง Popup
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={userPosition}>
                <Popup>
                  <h3 className="font-bold">Your Location full map</h3>
                </Popup>
              </Marker>

              <LandmarkMap landmarks={landmarks} posts={posts} />
              {posts.map((post) =>
                post.latitude && post.longitude ? (
                  <Marker
                    key={post.id}
                    position={[post.latitude, post.longitude]}
                    // onMouseEnter={() => handleMouseEnter(post)}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <Popup>
                      <h3 className="font-bold">{post.author}</h3>
                      <p>{post.content}</p>
                    </Popup>
                  </Marker>
                ) : null
              )}
              <UserLocationUpdater userPosition={userPosition} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventMap;
