import React from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Post_post from '../../components/Post_post';
import UserLocationUpdater from './UserLocationUpdater';

const MapModal = ({ isOpen, onClose, userPosition, posts }) => {
  if (!isOpen) return null;

  const icons = {
    ALERT: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2299/2299283.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    NEWS: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2964/2964063.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    SHOP: new L.Icon({
      iconUrl: 'https://png.pngtree.com/png-vector/20220912/ourmid/pngtree-shop-icon-png-image_6170900.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    JOB: new L.Icon({
      iconUrl: 'https://cdn-icons-png.freepik.com/256/14993/14993311.png?semt=ais_hybrid',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    OTHER: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9970/9970242.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
  };

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

          {posts.map((post) => {
            // const postDetails = Post_post({ postId: post.id });

            // if (postDetails && postDetails.locationLat && postDetails.locationLng) {
              return (
                <Marker key={post.id} position={[post.locationLat, post.locationLng]}
                icon={icons[post.category] || icons.Other}
                eventHandlers={{'click':(e)=>console.log(post.postId)}}
                >
                  <Popup>
                    <h3 className="font-bold">{post.author}</h3>
                    <p>{post.content}</p>
                  </Popup>
                </Marker>
              );
            // }
            return null;
          })}
          
          <UserLocationUpdater userPosition={userPosition} />
        </MapContainer>
      </div>
    </div>,
    document.body // Render modal outside of the root component
  );
};

export default MapModal;
