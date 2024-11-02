import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import "leaflet/dist/leaflet.css";
import { IoSendSharp } from "react-icons/io5";
import { newPostApi } from "../apis/post-api";
import usePostStore from "../stores/postStore";
import { FaImage } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoTrashBin } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { getUserForNewPostApi } from "../apis/post-api";
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
import useUserStore from "../stores/userStore";
function Post_new() {
  const token = useUserStore((state) => state.token);
  const files = usePostStore((state) => state.files);
  const setFiles = usePostStore((state) => state.setFiles);
  const [rangeVal, setRangeVal] = useState(24);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);
  const [input, setInput] = useState({
    txt: "",
    lat: "",
    lng: "",
    drt: 24,
    cat: "",
  });
  const hdlClosePopup = (e) => {
    setInput({
      txt: "",
      lat: "",
      lng: "",
      drt: 24,
      cat: "",
    });
    setFiles([]);
    setUser({});
    setMarkerPosition({ lat: null, lng: null });
    document.getElementById("post-new-modal").close();
  };
  const getUserForNewPost = async () => {
    try {
      const result = await getUserForNewPostApi(token);
      setUser(result.data.user);
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setInput((prv) => ({ ...prv, lat, lng }));
        setMarkerPosition([lat, lng]);
      },
    });
  };
  const hdlNewPost = async () => {
    try {
      setLoading(true);
      // validate
      if (Object.values(input).some((v) => v === "")) {
        console.log("Miss information");
        return;
      }
      if (files.length > 10) {
        console.log("Maximum upload 10 images per time");
        return;
      }
      const body = new FormData();
      body.append("txt", input.txt);
      body.append("lat", input.lat);
      body.append("lng", input.lng);
      body.append("drt", input.drt);
      body.append("cat", input.cat);
      files.forEach((file) => {
        body.append("images", file);
      });
      const result = await newPostApi(token, body);
      console.log(result.data);
      hdlClosePopup();
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  const hdlFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeImage = (idx) => {
    setFiles(files.filter((v, i) => i !== idx));
  };
  useEffect(() => {
    getUserForNewPost();
  }, []);
  return (
    <div
      className="w-6/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10 rounded-xl gap-5 "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(files)}>Test</button> */}
      {/* <button onClick={() => console.log(input)}>input</button> */}
      {/* user area */}
      <div className="flex gap-5">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
          src={user?.imageUrl}
          alt="no load"
        />
        <div className="flex flex-col justify-between text-my-text w-full flex-1">
          <div className="flex justify-between">
            <p className="text-2xl translate-y-2">{user?.displayName}</p>
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
        <div className="flex-1 w-1/2 flex flex-col gap-2">
          <div className="border h-full rounded-xl bg-slate-50">
            <input
              type="file"
              id="input-file"
              className="opacity-0 absolute"
              multiple
              accept="image/*"
              onChange={hdlFileChange}
            />
            {/* picture lists */}
            <div className="flex flex-col gap-2 p-3 max-h-[600px] overflow-auto">
              {files.length > 0 ? (
                <AnimatePresence>
                  {files.map((el, idx) => (
                    <motion.div
                      key={el.idx} // Use a unique key like el.name or el.url if available
                      className="w-full border rounded-xl bg-my-bg-card px-2 flex items-center justify-between shadow-md"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={URL.createObjectURL(el)}
                          alt="no load"
                          className="w-[100px] h-[100px] object-cover rounded-xl"
                        />
                        <p>{el.name}</p>
                      </div>
                      <IoTrashBin
                        className="p-2 text-[40px] text-my-acct cursor-pointer hover:text-my-btn-hover"
                        onClick={() => removeImage(idx)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div
                  className="w-full min-h-[300px] flex flex-col justify-center items-center text-my-text text-opacity-50 cursor-pointer"
                  onClick={() => document.getElementById("input-file").click()}
                >
                  <RiImageAddFill className="text-[100px]" />
                  <p>Add photos</p>
                </div>
              )}
            </div>
          </div>
          <button
            className="btn btn-primary bg-my-acct border-none  hover:bg-my-acct-hover  text-white"
            onClick={() => document.getElementById("input-file").click()}
          >
            <FaImage className="text-2xl" />
            Add Picture
          </button>
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <div className="h-[400px] w-full rounded-xl overflow-hidden">
            <MapContainer
              center={[13.721792197183028, 100.4980552161973]}
              zoom={16}
              scrollWheelZoom={false}
              dragging={false}
              zoomControl={false}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
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
          <div className="w-full h-[120px] flex flex-col items-center justify-start border rounded-xl gap-5 bg-slate-50">
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
          <div className="w-full h-[120px] flex flex-col items-center justify-start border rounded-xl bg-slate-50">
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
      </div>

      {/* send button */}
      <button
        className="btn btn-primary bg-my-secon hover:bg-my-secon-hover border-none text-lg text-white items-center"
        onClick={hdlNewPost}
      >
        <IoSendSharp className="text-2xl -translate-y-[2px]" />
        Create Post
      </button>
      {/* loading */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute w-full h-full bg-black opacity-20"></div>
          <span className="loading loading-spinner text-my-acct w-[150px]"></span>
        </div>
      )}
    </div>
  );
}

export default Post_new;
