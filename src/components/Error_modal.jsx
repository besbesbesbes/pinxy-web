import { BiError } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import useErrStore from "../stores/errStore";
import { AiOutlineOpenAI } from "react-icons/ai";

function Error_modal() {
  const errTxt = useErrStore((state) => state.errTxt);
  const hdlClosePopup = () => {
    document.getElementById("error-modal").close();
  };
  return (
    <div
      className="w-4/12  min-h-[100px] bg-my-bg-card flex flex-col py-5 px-10 rounded-xl shadow-md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between">
        <p className="text-xl flex items-baseline  text-my-acct ">
          <BiError className="text-4xl translate-y-1 mr-2" />
          Error!
        </p>
        {/* close button */}
        <button
          className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
          onClick={hdlClosePopup}
        >
          <IoIosClose className="absolute" />
        </button>
      </div>
      <hr className="my-2" />
      <div className="w-full text-xl mb-2 flex justify-center items-center gap-1 flex-wrap">
        {errTxt}
      </div>
      {errTxt.includes("violation") && (
        <div>
          <hr className="my-2" />

          <p className="flex-1 text-my-text text-opacity-50 text-justify">
            <strong>Warning:</strong> Your comment may contain language that
            violates our guidelines. Please avoid using potentially offensive
            terms, as our AI moderation might flag innocent comments too. If you
            believe this is an error, feel free to reach out for support.
          </p>
          <div className="w-full flex justify-end">
            <div className="w-fit self-end flex items-center text-white px-2 py-1 bg-blue-500 rounded-full gap-1 justify-center">
              <p className="text-sm italic">powered by</p>
              <AiOutlineOpenAI className="text-2xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Error_modal;
