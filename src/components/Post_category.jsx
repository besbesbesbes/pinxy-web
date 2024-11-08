import { IoNewspaper } from "react-icons/io5";
import { IoIosAlert } from "react-icons/io";
import { RiShoppingBasketFill } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import { BsChatLeftDotsFill } from "react-icons/bs";

function Post_category({ cat }) {
  return (
    <>
      {cat === "NEWS" ? (
        <div className="bg-my-cat-news text-white font-bold w-fit px-3 py-1 rounded-full flex items-baseline gap-1">
          <IoNewspaper className="text-xl translate-y-1" />
          {cat}
        </div>
      ) : cat === "ALERT" ? (
        <div className="bg-my-cat-alert text-white font-bold w-fit px-3 py-1 rounded-full flex items-baseline gap-1">
          <IoIosAlert className="text-xl translate-y-1" />
          {cat}
        </div>
      ) : cat === "SHOP" ? (
        <div className="bg-my-cat-shop text-white font-bold w-fit px-3 py-1 rounded-full flex items-baseline gap-1">
          <RiShoppingBasketFill className="text-xl translate-y-1" />
          {cat}
        </div>
      ) : cat === "JOB" ? (
        <div className="bg-my-cat-job text-white font-bold w-fit px-3 py-1 rounded-full flex items-baseline gap-1">
          <MdOutlineWork className="text-xl translate-y-1" />
          {cat}
        </div>
      ) : cat === "OTHER" ? (
        <div className="bg-my-cat-other text-white font-bold w-fit px-3 py-1 rounded-full flex items-baseline gap-1">
          <BsChatLeftDotsFill className="text-xl translate-y-1" />
          {cat}
        </div>
      ) : null}
    </>
  );
}

export default Post_category;
