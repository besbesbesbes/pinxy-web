import { IoIosClose } from "react-icons/io";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
import { getPostApi, editPostApi } from "../apis/post-api";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { FaImage } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoTrashBin } from "react-icons/io5";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { IoNewspaper } from "react-icons/io5";
import { IoIosAlert } from "react-icons/io";
import { RiShoppingBasketFill } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
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

function Post_edit_modal() {
  const token = useUserStore((state) => state.token);
  const curPostId = usePostStore((state) => state.curPostId);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState({});
  const files = usePostStore((state) => state.files);
  const setFiles = usePostStore((state) => state.setFiles);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const setReloadPost = usePostStore((state) => state.setReloadPost);
  const [tempFiles, setTempFiles] = useState(files);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [input, setInput] = useState({
    txt: "",
    lat: "",
    lng: "",
    drt: 24,
    cat: "",
  });

  const timeUntilFromNow = (isoDate) => {
    const targetDate = new Date(isoDate);
    const now = new Date();
    const diffInMs = targetDate - now;
    if (diffInMs < 0) {
      return "Time has passed";
    }
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return diffInHours;
  };
  const hdlClosePopup = (e) => {
    setFiles([]);
    setImagesToDelete([]);
    document.getElementById("post-edit-modal").close();
  };
  const getPost = async () => {
    try {
      const result = await getPostApi(token, curPostId);
      console.log(result.data.resPost);
      console.log(result.data.user);
      setPost(result.data.resPost);
      setInput({
        txt: result.data.resPost.content,
        lat: result.data.resPost.locationLat,
        lng: result.data.resPost.locationLng,
        drt: +timeUntilFromNow(result.data.resPost.expirationDate),
        cat: result.data.resPost.category,
      });
      setMarkerPosition([
        result.data.resPost.locationLat,
        result.data.resPost.locationLng,
      ]);
      setUser(result.data.user);
    } catch (err) {
      console.log(err.response.data.error || err.message);
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
  const hdlFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeImage = (idx) => {
    setFiles(files.filter((v, i) => i !== idx));
  };
  const setPostImages = (newImages) => {
    setPost((prevPost) => ({
      ...prevPost,
      images: newImages,
    }));
  };
  const removeImageFromPost = (index, id) => {
    setPost((prevPost) => ({
      ...prevPost,
      images: prevPost.images.filter((_, idx) => idx !== index),
    }));
    setImagesToDelete((prv) => [...prv, id]);
  };
  const hdlEditPost = async () => {
    try {
      setLoading(true);
      if (files.length > 10) {
        console.log("Maximum upload 10 images per time");
        return;
      }

      const body = new FormData();
      body.append("postId", curPostId);
      body.append("txt", input.txt);
      body.append("cat", input.cat);
      body.append("drt", input.drt);
      body.append("lat", input.lat);
      body.append("lng", input.lng);
      body.append("imagesToDelete", imagesToDelete);
      files.forEach((file) => {
        body.append("images", file);
      });
      await editPostApi(token, body);
      setReloadPost(true);
      getPost();
      hdlClosePopup();
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (curPostId) {
      getPost();
    }
  }, [curPostId]);
  return (
    <div
      className="w-6/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10 rounded-xl gap-5 "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(post)}>post</button> */}
      <div
        className="flex flex-col gap-5 overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "auto" }}
      >
        {/* user area */}
        <div className="flex gap-5">
          <img
            className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
            src={post?.user?.imageUrl}
            alt="no load"
          />
          <div className="flex flex-col justify-between text-my-text w-full flex-1">
            <div className="flex justify-between">
              <p className="text-2xl translate-y-2">
                {post?.user?.displayName}
              </p>
              {/* button */}
              <div className="flex gap-1">
                {/* close button */}
                <button
                  className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
                  onClick={hdlClosePopup}
                >
                  <IoIosClose className="absolute" />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-my-secon">{format(post?.createdAt)}</p>
              <p className="italic text-my-acct">
                ...End {format(post?.expirationDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* text area */}
      <textarea
        placeholder="What's on your mind..."
        className="bg-slate-50 min-h-[100px] p-5 rounded-2xl flex-1 self-start resize-none w-full shadow-md"
        value={input.txt}
        onChange={(e) => setInput((prv) => ({ ...prv, txt: e.target.value }))}
      />
      {/* map and picture area */}
      <div className="flex gap-5">
        <div className="flex-1 w-1/2 flex flex-col gap-2">
          <div className="border h-full rounded-xl bg-slate-50 shadow-md">
            <input
              type="file"
              id="input-file"
              className="opacity-0 absolute"
              multiple
              accept="image/*"
              onChange={hdlFileChange}
            />
            {/* picture lists */}
            <div className="flex flex-col px-2 max-h-[600px] overflow-auto">
              {post?.images.length > 0 ? (
                <div>
                  {/* First Reorder Group for post.images */}
                  <Reorder.Group
                    axis="y"
                    values={post?.images}
                    onReorder={setPostImages}
                  >
                    <AnimatePresence>
                      {post?.images.map((el, idx) => (
                        <Reorder.Item
                          key={el.imageUrl} // Use a unique key like el.name or el.url if available
                          value={el}
                        >
                          <motion.div
                            className="w-full border rounded-xl bg-my-bg-card px-2 flex items-center justify-between shadow-md p-2 my-2"
                            initial={{ opacity: 1, x: 0 }} // Starting position
                            animate={{ opacity: 1, x: 0 }} // Keep it in the same position
                            exit={{ opacity: 0, x: -20 }} // Move left and fade out
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={el.imageUrl}
                                alt="no load"
                                className="w-[100px] h-[100px] object-cover rounded-xl"
                              />
                              <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-[200px]">
                                {el.imageUrl}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <VscThreeBars className="text-2xl text-my-text text-opacity-20" />
                              <IoTrashBin
                                className="p-2 text-[40px] text-my-acct cursor-pointer hover:text-my-btn-hover"
                                onClick={() => removeImageFromPost(idx, el.id)} // Function to remove from post.images
                              />
                            </div>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </AnimatePresence>
                  </Reorder.Group>

                  {/* Second Reorder Group for files */}
                  <Reorder.Group axis="y" values={files} onReorder={setFiles}>
                    <AnimatePresence>
                      {files.map((el, idx) => (
                        <Reorder.Item
                          key={el.name} // Use a unique key like el.name or el.url if available
                          value={el}
                        >
                          <motion.div
                            className="w-full border rounded-xl bg-my-bg-card px-2 flex items-center justify-between shadow-md p-2 my-2"
                            initial={{ opacity: 1, x: 0 }} // Starting position
                            animate={{ opacity: 1, x: 0 }} // Keep it in the same position
                            exit={{ opacity: 0, x: -20 }} // Move left and fade out
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={URL.createObjectURL(el)}
                                alt="no load"
                                className="w-[100px] h-[100px] object-cover rounded-xl"
                              />
                              <p className="flex-1">{el.name}</p>
                            </div>
                            <div className="flex items-center">
                              <VscThreeBars className="text-2xl text-my-text text-opacity-20" />
                              <IoTrashBin
                                className="p-2 text-[40px] text-my-acct cursor-pointer hover:text-my-btn-hover"
                                onClick={() => removeImage(idx)} // Function to remove from files
                              />
                            </div>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </AnimatePresence>
                  </Reorder.Group>
                </div>
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
            className="btn btn-primary bg-my-acct border-none  hover:bg-my-acct-hover  text-white shadow-md"
            onClick={() => document.getElementById("input-file").click()}
          >
            <FaImage className="text-2xl" />
            Add Picture
          </button>
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md">
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
          <div className="w-full h-[120px] flex flex-col items-center justify-start border rounded-xl gap-5 bg-slate-50 shadow-md">
            {/* category */}
            <p className="m-2 font-bold">Category</p>
            <div className="relative inline-block w-full px-10">
              <div className="flex gap-4 items-center">
                {input.cat === "ALERT" && (
                  <div className="bg-my-cat-alert p-2 rounded-full shadow-lg">
                    <IoIosAlert className="text-2xl text-white" />
                  </div>
                )}
                {input.cat === "NEWS" && (
                  <div className="bg-my-cat-news p-2 rounded-full shadow-lg">
                    <IoNewspaper className="text-2xl text-white" />
                  </div>
                )}
                {input.cat === "SHOP" && (
                  <div className="bg-my-cat-shop p-2 rounded-full shadow-lg">
                    <RiShoppingBasketFill className="text-2xl text-white" />
                  </div>
                )}
                {input.cat === "JOB" && (
                  <div className="bg-my-cat-job p-2 rounded-full shadow-lg">
                    <MdOutlineWork className="text-2xl text-white" />
                  </div>
                )}
                {input.cat === "OTHER" && (
                  <div className="bg-my-cat-other p-2 rounded-full shadow-lg">
                    <BsChatLeftDotsFill className="text-2xl text-white" />
                  </div>
                )}

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
          </div>
          <div className="w-full h-[120px] flex flex-col items-center justify-start border rounded-xl bg-slate-50 shadow-md">
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
        className="btn btn-primary bg-my-secon hover:bg-my-secon-hover border-none text-lg text-white items-center shadow-md"
        onClick={hdlEditPost}
      >
        <MdModeEdit className="text-2xl -translate-y-[2px]" />
        Edit Post
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

export default Post_edit_modal;
