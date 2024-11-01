import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EventMap = ({ posts }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
    <h4 className="text-xl font-bold mb-4">Map</h4>
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer center={[40.73061, -73.935242]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {posts.map((post) => (
          <Marker key={post.id} position={[post.latitude, post.longitude]}>
            <Popup>
              <h3 className="font-bold">{post.author}</h3>
              <p>{post.content}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </div>
);

export default EventMap;