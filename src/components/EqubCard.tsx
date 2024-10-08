import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../Redux/store";
import Modal from "./Model/JoinModel";

interface cardProps {
  name: string;
  amount: number;
  No_member: number;
  createdAt: Date;
  types: string;
  equb_Group_id: string;
  status: string;
}

const Card = ({
  name,
  amount,
  No_member,
  createdAt,
  types,
  equb_Group_id,
  status,
}: cardProps) => {
  const [members, setMembers] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const user = useSelector((state: RootState) => state.user.user);
  const token = user?.token;

  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    const fetchSingleEqubgroup = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/group/get/${equb_Group_id}`
      );
      setMembers(response.data.group.members.length);
    };

    fetchSingleEqubgroup();
  }, [equb_Group_id]);

  const handleJoin = async () => {
    try {
      if (!isLogin && !token) {
        setShowModal(true);
        return;
      }

      const joinResponse = await axios.post(
        `http://localhost:5000/api/v1/group/join/${equb_Group_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (joinResponse.status === 200) {
        toast.success("Successfully joined group");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.error === "UserAlreadyJoined"
      ) {
        toast.warning("You are already a member of this group");
      } else if (axiosError.response?.status === 400) {
        toast.warn(axiosError.response.data.error);
      }
    }
  };

  const formattedCreatedAt = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="mt-5">
      <div className="flex container mx-auto flex-col p-5 md:p-6 space-y-4 justify-between items-start h-fit md:w-[320px] lg:w-[360px] w-full  bg-white text-center border border-gray-300 dark:bg-neutral-700">
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly items-start space-y-8">
            <div className=" flex font-normal text-sm md:text-[18px] text-[#1F284F] dark:border-neutral-600 capitalize dark:text-neutral-50">
              <span className="text-normal  mr-5">Name :</span>
              <span className="font-pacifico">{name}</span>
            </div>
            <div className=" flex font-normal text-sm md:text-[18px] text-[#1F284F] dark:border-neutral-600 capitalize dark:text-neutral-50">
              <span className="text-normal mr-5">type :</span>
              {types}
            </div>
            <div className=" text-sm md:text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
              Members:
              <span className="ml-5 font-bold">
                ( {members}/{No_member} )<span className="px-3">joined</span>
              </span>
            </div>
            <div className=" text-sm md:text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-200">
              Amount: <span className="ml-5 font-bold"> {amount} Birr</span>
            </div>
            <div className=" text-sm md:text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-200">
              Status:
              <span className="ml-5 font-bold text-[#008B8B]">{status}</span>
            </div>
            <div className="text-sm md:text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
              <span>Created At:</span>
              <span className="ml-5 font-bold">{formattedCreatedAt}.</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex justify-center items-center rounded bg-[#008B8B] hover:bg-[#7da7a7]  w-full pb-2  text-[16px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleJoin}
        >
          Join Us
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Card;
