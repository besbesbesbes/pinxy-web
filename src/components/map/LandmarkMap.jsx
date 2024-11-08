import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import usePostStore from "../../stores/postStore";

// Define unique icons for each category
const icons = {
  ALERT: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2299/2299283.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
  }),
  NEWS: new L.Icon({
    iconUrl:
      "https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/new-icon.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
  }),
  SHOP: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6136/6136558.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
  }),
  JOB: new L.Icon({
    iconUrl:
      "https://cdn-icons-png.freepik.com/256/393/393790.png?semt=ais_hybrid",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
  }),
  OTHER: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5857/5857418.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
  }),
};

const LandmarkMap = ({ landmarks, posts }) => {
  // console.log(posts);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const hdlShowPost = (postId) => {
    setCurPostId(postId);
    document.getElementById("post-modal").showModal();
  };

  return (
    <>
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[post.locationLat, post.locationLng]}
          icon={icons[post.category] || icons.Other}
          eventHandlers={{ click: (e) => hdlShowPost(post.postId) }}
        >
          <Popup>
            <h3 className="font-bold">{post.content}</h3>
            <p>{post.description}</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default LandmarkMap;
