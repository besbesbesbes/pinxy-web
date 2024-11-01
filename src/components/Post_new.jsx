import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import "leaflet/dist/leaflet.css";
import { IoSendSharp } from "react-icons/io5";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  Tooltip,
  LayerGroup,
} from "react-leaflet";
function Post_new() {
  const [rangeVal, setRangeVal] = useState(24);
  const hdlClosePopup = (e) => {
    document.getElementById("post-new-modal").close();
  };
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    txt: "",
    lat: "",
    lng: "",
    drt: 24,
    cat: "",
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setInput((prv) => ({ ...prv, lat, lng }));
        setMarkerPosition([lat, lng]);
      },
    });
  };
  return (
    <div
      className="w-6/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col py-5 px-10 rounded-xl gap-5 pb-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button onClick={() => console.log(input)}>input</button>
      {/* user area */}
      <div className="flex gap-5">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
          src=""
          alt="no load"
        />
        <div className="flex flex-col justify-between text-my-text w-full flex-1">
          <div className="flex justify-between">
            <p className="text-2xl translate-y-2">UserName</p>
            {/* button */}
            <div className="flex">
              {/* close button */}
              <button
                className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
                onClick={hdlClosePopup}
              >
                <IoIosClose className="absolute" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* text area */}
      <textarea
        placeholder="What's on your mind..."
        className="bg-my-text bg-opacity-5 min-h-[100px] p-5 rounded-2xl flex-1 self-start resize-none w-full"
        value={input.txt}
        onChange={(e) => setInput((prv) => ({ ...prv, txt: e.target.value }))}
      />
      {/* map and picture area */}
      <div className="flex gap-5">
        <div className="h-[300px] w-1/2 rounded-xl overflow-hidden">
          <MapContainer
            center={[13.721792197183028, 100.4980552161973]}
            zoom={16}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />
            {markerPosition && (
              <Marker position={markerPosition}>
                <Popup>You clicked here</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
        <div className="h-[300px] w-1/2 flex flex-col gap-2">
          <div className="border h-full rounded-xl">Pictures</div>
          <button className="btn btn-primary bg-my-secon hover:bg-my-secon-hover border-none text-white">
            Add Picture
          </button>
        </div>
      </div>
      <div className="w-full flex gap-5">
        <div className="w-1/2 h-[120px] flex flex-col items-center justify-start border rounded-xl gap-5 bg-slate-50">
          {/* category */}
          <p className="m-2 font-bold">Category</p>
          <div className="relative inline-block w-full px-10">
            <select
              defaultValue={input.cat}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
              value={input.cat}
              onChange={(e) =>
                setInput((prv) => ({ ...prv, cat: e.target.value }))
              }
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="ALERT">Alert</option>
              <option value="NEWS">News</option>
              <option value="SHOP">Shop</option>
              <option value="JOB">Job</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 h-[120px] flex flex-col items-center justify-start border rounded-xl bg-slate-50">
          {/* duration */}
          <p className="m-2 font-bold">Post duration</p>
          <div className="bg-white rounded-lg p-6 w-full flex gap-1">
            <input
              type="range"
              min="1"
              max="168"
              value={input.drt}
              className="w-full"
              onChange={(e) =>
                setInput((prv) => ({ ...prv, drt: e.target.value }))
              }
            />
            <p className="mx-5 whitespace-nowrap">{input.drt} hours</p>
          </div>
        </div>
      </div>
      {/* send button */}
      <button className="btn btn-primary bg-my-secon hover:bg-my-secon-hover border-none text-lg text-white items-center">
        <IoSendSharp className="text-2xl -translate-y-[2px]" />
        Create Post
      </button>
    </div>
  );
}

export default Post_new;
