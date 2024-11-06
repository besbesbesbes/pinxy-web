import React from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Post_post from '../../components/Post_post';
import UserLocationUpdater from './UserLocationUpdater';

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

          {posts.map((post) => {
            const postDetails = Post_post({ postId: post.id });

            if (postDetails && postDetails.latitude && postDetails.longitude) {
              return (
                <Marker key={postDetails.id} position={[postDetails.latitude, postDetails.longitude]}>
                  <Popup>
                    <h3 className="font-bold">{postDetails.author}</h3>
                    <p>{postDetails.content}</p>
                  </Popup>
                </Marker>
              );
            }
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
