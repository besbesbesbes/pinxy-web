import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Define unique icons for each category
const icons = {
  Alert: new L.Icon({
    iconUrl: '/path/to/alert-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Events: new L.Icon({
    iconUrl: '/path/to/events-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Shop: new L.Icon({
    iconUrl: '/path/to/shop-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Jobs: new L.Icon({
    iconUrl: '/path/to/jobs-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Other: new L.Icon({
    iconUrl: '/path/to/other-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

const LandmarkMap = ({ landmarks }) => {
  return (
    <>
      {landmarks.map((landmark) => (
        <Marker
          key={landmark.id}
          position={[landmark.latitude, landmark.longitude]}
          icon={icons[landmark.category] || icons.Other}
        >
          <Popup>
            <h3 className="font-bold">{landmark.name}</h3>
            <p>{landmark.description}</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default LandmarkMap;
