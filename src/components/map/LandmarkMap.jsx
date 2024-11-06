import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Define unique icons for each category
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


const LandmarkMap = ({ landmarks,posts }) => {
  // console.log(posts)
  return (
    <>
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[post.locationLat, post.locationLng]}
          icon={icons[post.category] || icons.Other}
        >
          <Popup>
            <h3 className="font-bold">{post.name}</h3>
            <p>{post.description}</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default LandmarkMap;
