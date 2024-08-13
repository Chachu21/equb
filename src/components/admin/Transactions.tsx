import UserTransaction from "../UserDashboard/UI/UserTransaction";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { backend_url } from "../../constant";

const Transactions = () => {
  const user_id = useSelector((state: RootState) => state.user.user?._id);

  return (
    <div className="container flex flex-col space-y-5 mt-10">
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        manage users transaction{" "}
      </h1>
      <UserTransaction
        urll={`${backend_url}/api/v1/payment/get`}
        user_id={`${user_id}`}
        isSearch={true}
      />
    </div>
  );
};

export default Transactions;
