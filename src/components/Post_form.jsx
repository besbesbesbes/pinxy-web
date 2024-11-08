import { getUserForNewPostApi } from "../apis/post-api";
import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { FaCommentDots } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import usePostStore from "../stores/postStore";
import useGeoStore from "../stores/geoStore";
function Post_form() {
  const [userInfo, setUserInfo] = useState({});
  const token = useUserStore((state) => state.token);
  const SetIsRenderPostNew = usePostStore((state) => state.SetIsRenderPostNew);
  const updateUserPosition = useGeoStore((state) => state.updateUserPosition);
  const setSelectedUser = usePostStore((state) => state.setSelectedUser);
  const user = useUserStore((state) => state.user);
  const getUserForNewPost = async () => {
    try {
      const result = await getUserForNewPostApi(token);
      setUserInfo(result.data.user);
    } catch (err) {
      console.log(err?.response?.data?.error || err.message);
    }
  };
  const hdlNewPost = () => {
    SetIsRenderPostNew(true);
    document.getElementById("post-new-modal").showModal();
  };
  const hdlClickUseProfile = (e) => {
    e.stopPropagation();
    setSelectedUser(user.id);
  };
  useEffect(() => {
    getUserForNewPost();
  }, []);
  return (
    <div
      className="w-full min-h-[120px] bg-my-bg-card flex flex-col px-10 py-6 rounded-xl gap-5 shadow-md cursor-pointer"
      onClick={hdlNewPost}
    >
      <div className="flex gap-5">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full shadow-md hover:scale-110"
          src={userInfo?.imageUrl}
          alt="no load"
          onClick={(e) => hdlClickUseProfile(e)}
        />
        <div className="flex flex-col w-full flex-1 h-fit gap-2">
          <div className="bg-my-bg-main h-[40px] py-2 px-5 rounded-2xl flex-1 self-start w-full shadow-md mb-2">
            <p className="text-my-text text-opacity-40 italic">
              Got someting to share...
            </p>
          </div>
          <div className="flex justify-around text-lg">
            <div className="flex items-baseline gap-2">
              <FaCommentDots className="text-2xl text-my-prim translate-y-1" />
              <p className="text-my-text font-bold text-opacity-50">Posts</p>
            </div>
            <div className="flex items-baseline gap-2">
              <AiFillPicture className="text-2xl text-my-cat-job  translate-y-1" />
              <p className="text-my-text font-bold text-opacity-50">Photos</p>
            </div>
            <div className="flex items-baseline gap-2">
              <FaLocationDot className="text-2xl text-my-acct translate-y-1" />
              <p className="text-my-text font-bold text-opacity-50">
                Locations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post_form;
