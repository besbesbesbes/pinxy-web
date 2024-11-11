import { useEffect, useState } from "react";
import { format } from "timeago.js";
import Post_category from "./Post_category";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import usePostStore from "../stores/postStore";
import { getPostApi, upPostApi, downPostApi } from "../apis/post-api";
import useUserStore from "../stores/userStore";
import { div } from "framer-motion/client";
import { FaCommentDots } from "react-icons/fa";
import useGeoStore from "../stores/geoStore";
function Post_post({ postId, setCategoryOption }) {
  const token = useUserStore((state) => state.token);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState({});
  const [isAnimatingUpPost, setIsAnimatingUpPost] = useState(false);
  const [isAnimatingDownPost, setIsAnimatingDownPost] = useState(false);
  const reloadPost = usePostStore((state) => state.reloadPost);
  const setReloadPost = usePostStore((state) => state.setReloadPost);
  const curPostId = usePostStore((state) => state.curPostId);
  const setCurPostId = usePostStore((state) => state.setCurPostId);
  const updateUserPosition = useGeoStore((state) => state.updateUserPosition);
  const userPosition = useGeoStore((state) => state.userPosition);
  const addPostForAI = usePostStore((state) => state.addPostForAI);
  const clearPostForAI = usePostStore((state) => state.clearPostForAI);
  const postForAI = usePostStore((state) => state.postForAI);
  const postLocation = useGeoStore((state) => state.postLocation);
  const setPostLocation = useGeoStore((state) => state.setPostLocation);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const setActiveMenu = usePostStore((state) => state.setActiveMenu);
  const hdlShowPost = () => {
    // console.log("Show Post_modal");
    setCurPostId(postId);
    // updateUserPosition();
    document.getElementById("post-modal").showModal();
  };
  const hdlUpPost = async () => {
    setCurPostId(postId);
    try {
      await upPostApi(token, postId);
      setIsAnimatingUpPost(true);
      setReloadPost(true);
      setTimeout(() => setIsAnimatingUpPost(false), 1000);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlDownPost = async () => {
    setCurPostId(postId);
    try {
      await downPostApi(token, postId);
      setIsAnimatingDownPost(true);
      setReloadPost(true);
      setTimeout(() => setIsAnimatingDownPost(false), 1000);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const getPost = async () => {
    // console.log(`Call getPost for ${postId}`);
    try {
      const result = await getPostApi(token, postId);
      // console.log(result.data.resPost);
      setPost(result.data.resPost);
      setUser(result.data.user);
      // addPostForAI(result.data.resPost.content);
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const hdlClickUser = (e, userId) => {
    e.stopPropagation();
    setSelectedUser(userId);
    setActiveMenu("");
    setCategoryOption("");
  };
  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);
  useEffect(() => {
    if (reloadPost) {
      getPost();
      setReloadPost(false);
    }
  }, [reloadPost]);
  return (
    <div
      onMouseEnter={() => {
        setPostLocation([post.locationLat, post.locationLng]),
          console.log(postLocation);
      }}
      onMouseLeave={() => {
        setPostLocation(userPosition), console.log(postLocation);
      }}
      className="w-full  min-h-[100px] bg-my-bg-card flex flex-col py-5 px-10 rounded-xl shadow-md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(postForAI)}>postForAI</button> */}
      {/* {postId} */}
      {/* <button onClick={() => console.log(userPosition)}>userPosition</button> */}
      {/* {postId} */}
      <div
        className="flex flex-col gap-5 overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "auto" }}
      >
        {/* user area */}
        <div className="flex gap-5 cursor-pointer" onClick={hdlShowPost}>
          <img
            className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
            src={post?.user?.imageUrl}
            alt="no load"
            onClick={(e) => hdlClickUser(e, post?.user?.id)}
          />
          <div className="flex flex-col justify-between text-my-text w-full flex-1">
            <div className="flex justify-between">
              <p
                className="text-2xl translate-y-2"
                onClick={(e) => hdlClickUser(e, post?.user?.id)}
              >
                {post?.user?.displayName}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-my-secon">{format(post?.createdAt)}</p>
              <p className="italic text-my-acct">
                ...End {format(post?.expirationDate)}
              </p>
            </div>
          </div>
        </div>
        {/* category */}
        <div className="w-full cursor-pointer" onClick={hdlShowPost}>
          <Post_category cat={post?.category} />
        </div>
        {/* text content area */}
        <div onClick={hdlShowPost} className="cursor-pointer">
          <p className="text-2xl">{post?.content}</p>
        </div>
        {/* picture content area */}
        <div className="w-full cursor-pointer" onClick={hdlShowPost}>
          {/* 1 picture */}
          {post?.images.length == 1 && (
            <div className="w-full">
              <img
                className="max-h-[400px] w-full object-cover rounded-xl"
                src={post?.images[0].imageUrl}
                alt=""
              />
            </div>
          )}
          {/* 2 pictures */}
          {post?.images.length == 2 && (
            <div className="w-full flex rounded-xl overflow-hidden">
              <img
                className="max-h-[400px] w-1/2 object-cover border"
                src={post?.images[0].imageUrl}
                alt=""
              />
              <img
                className="max-h-[400px] w-1/2 object-cover border"
                src={post?.images[1].imageUrl}
                alt=""
              />
            </div>
          )}
          {/* 3 pictures */}
          {post?.images.length == 3 && (
            <div className="w-full flex rounded-xl overflow-hidden">
              <img
                className="max-h-[400px] w-1/2 object-cover border"
                src={post?.images[0].imageUrl}
                alt=""
              />
              <div className="w-full">
                <img
                  className="max-h-[200px] w-full object-cover border"
                  src={post?.images[1].imageUrl}
                  alt=""
                />
                <img
                  className="max-h-[200px] w-full object-cover border"
                  src={post?.images[2].imageUrl}
                  alt=""
                />
              </div>
            </div>
          )}
          {/* 4 pictures */}
          {post?.images.length == 4 && (
            <div className="w-full flex rounded-xl overflow-hidden">
              <img
                className="max-h-[400px] w-1/2 object-cover border"
                src={post?.images[0].imageUrl}
                alt=""
              />
              <div className="w-full">
                <img
                  className="max-h-[200px] w-full object-cover border"
                  src={post?.images[1].imageUrl}
                  alt=""
                />
                <div className="flex">
                  <img
                    className="max-h-[200px] w-1/2 object-cover border"
                    src={post?.images[2].imageUrl}
                    alt=""
                  />
                  <img
                    className="max-h-[200px] w-1/2 object-cover border"
                    src={post?.images[3].imageUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
          {/* >4 pictures */}
          {post?.images.length > 4 && (
            <div className="w-full flex rounded-xl overflow-hidden">
              <img
                className="max-h-[400px] w-1/2 object-cover border"
                src={post?.images[0].imageUrl}
                alt=""
              />
              <div className="w-full">
                <img
                  className="max-h-[200px] w-full object-cover border"
                  src={post?.images[1].imageUrl}
                  alt=""
                />
                <div className="flex">
                  <img
                    className="max-h-[200px] w-1/2 object-cover border"
                    src={post?.images[2].imageUrl}
                    alt=""
                  />
                  <div className="max-h-[200px] w-1/2 relative">
                    <img
                      className="object-cover border"
                      src={post?.images[3].imageUrl}
                      alt=""
                    />
                    <div className="h-full w-full bg-black absolute top-0 opacity-25"></div>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                      +{post?.images.length - 4}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {/* engaging area */}
          <div
            className="w-full flex justify-between text-my-text text-opacity-70 text-lg cursor-pointer"
            onClick={hdlShowPost}
          >
            <div className="flex items-baseline gap-2">
              <div className="flex items-baseline gap-1">
                <p>{post?.upVoteCount}</p>
                <ImArrowUp className="text-my-prim-hover" />
              </div>
              <div className="flex items-baseline gap-1">
                <p>{post?.downVoteCount}</p>
                <ImArrowDown className="text-my-acct-hover" />
              </div>
            </div>
            <p>{post?._count.comments} comments</p>
          </div>
          {/* vote area */}
          <div className="w-full h-[50px] border-x-0 border-b-0 border-[2px] border-my-text border-opacity-20 flex justify-evenly text-lg text-my-text text-opacity-20 font-bold items-center gap-20 pt-2">
            <button
              className={`flex gap-2 items-baseline hover:text-my-prim cursor-pointer ${
                isAnimatingUpPost
                  ? "animate__animated animate__bounceIn text-my-prim"
                  : ""
              } ${post?.userVotePostValue == "UP" ? "text-my-prim" : null}`}
              onClick={hdlUpPost}
            >
              <ImArrowUp className="text-2xl font-bold" />
              UP
            </button>
            <button
              className="flex gap-2 items-baseline cursor-pointer"
              onClick={hdlShowPost}
            >
              <FaCommentDots className="text-2xl font-bold" /> COMMENT
            </button>
            <button
              className={`flex gap-2 items-baseline hover:text-my-acct cursor-pointer ${
                isAnimatingDownPost
                  ? "animate__animated animate__bounceIn text-my-acct"
                  : ""
              } ${post?.userVotePostValue == "DOWN" ? "text-my-acct" : null}`}
              onClick={hdlDownPost}
            >
              <ImArrowDown className="text-2xl font-bold" /> DOWN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post_post;
