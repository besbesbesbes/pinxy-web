import { MdOutlineReport } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  getReportUserReasonApi,
  reportUserApi,
  getReportedUserApi,
} from "../apis/post-api";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
function Report_user_modal() {
  const [reasons, setReasons] = useState([]);
  const [input, setInput] = useState("");
  const [reportedUser, setReportedUser] = useState({});
  const selectedUser = usePostStore((state) => state.selectedUser);
  const token = useUserStore((state) => state.token);
  const hdlClosePopup = (e) => {
    setInput("");
    // setReportedUser({});
    document.getElementById("report-user-modal").close();
  };
  const hdlReportUser = async () => {
    try {
      if (!input) {
        console.log("Please select reason.");
        return;
      }
      await reportUserApi(token, selectedUser, input);
      setInput("");
      hdlClosePopup();
    } catch (err) {
      console.log(err.response.data.error || err.message);
    }
  };
  const getReportedUser = async () => {
    const result = await getReportedUserApi(token, selectedUser);
    setReportedUser(result.data.reportedUser);
  };
  const getReportUserReason = async () => {
    const result = await getReportUserReasonApi(token);
    setReasons(result.data.reasons);
  };
  useEffect(() => {
    getReportUserReason();
  }, []);
  useEffect(() => {
    if (selectedUser) {
      getReportedUser();
    }
  }, [selectedUser]);
  return (
    <div
      className="w-4/12 max-h-full bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col py-5 px-10 rounded-xl gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(curUserId)}>input</button> */}
      <div className="flex justify-between">
        <p className="text-xl flex items-baseline">
          <MdOutlineReport className="text-4xl translate-y-1 text-my-prim" />
          Report User
        </p>

        {/* close button */}
        <button
          className="btn w-[50px] h-[50px] bg-my-text bg-opacity-5 text-my-text rounded-full text-4xl font-bold flex justify-center items-center hover:bg-opacity-10 relative"
          onClick={hdlClosePopup}
        >
          <IoIosClose className="absolute" />
        </button>
      </div>
      {/* user area */}
      <div className="flex gap-5">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full shadow-md"
          src={reportedUser?.imageUrl}
          alt="no load"
        />
        <div className="flex flex-col justify-between text-my-text w-full flex-1">
          <div className="flex justify-between">
            <p className="text-2xl translate-y-2">
              {reportedUser?.displayName}
            </p>
          </div>
        </div>
      </div>
      <p>
        Please let us know why you're reporting this user. This helps us
        maintain a safe and respectful community.
      </p>
      <hr />
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">
          Reason for report:
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {reasons.map((el, idx) => (
            <option key={idx} value={el?.id}>
              {el?.content}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <p className="flex-1 text-my-text text-opacity-50">
          <strong>Warning:</strong> False reports or reports made to harass
          others may lead to restrictions on your account.
        </p>
        <button className="btn self-end bg-my-secon hover:bg-my-secon-hover">
          <IoSendSharp
            className="text-2xl text-white"
            onClick={hdlReportUser}
          />
        </button>
      </div>
    </div>
  );
}

export default Report_user_modal;
