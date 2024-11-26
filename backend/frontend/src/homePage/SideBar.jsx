import img from "../assets/react.svg";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { PiHandWithdrawFill } from "react-icons/pi";
import { BiSolidDashboard } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { RiLogoutBoxFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import toast from "react-hot-toast";

export default function SideBar({ setComponent }) {
  const { setAuthUser } = useAuth();

  const navigateTo = useNavigate();

  const handleComponent = (value) => {
    console.log(value);
    setComponent(value);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        "/api/users/logout"
        //  { withCredentials: true }
      );
      toast.success("Loggout successfully");
      localStorage.removeItem("auth");
      setAuthUser("");
      navigateTo("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/myself");
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  console.log(user);

  return (
    <>
      <div className="hidden md:block md:w-[20%] h-screen  p-5 bg-transparent hover:bg-slate-900 hover:shadow-gray-500 shadow-2xl duration-500 ">
        {/* <div className="text-center">
          <h2 className="text-3xl font-semibold text-blue-400">FINANCE</h2>
        </div> */}
        <div className="text-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-500 to-red-300 tracking-widest">
              Fin-Edge
            </h2>
          </div>
        </div>

        {/* <h2 className="text-2xl text-white">Logo</h2> */}
        <div className="flex justify-center items-center mt-8">
          <img
            className="w-36 h-36 border rounded-full object-cover"
            src={user?.photo?.url}
            alt="User image"
          />
        </div>
        <h2 className="text-center mt-5 text-3xl font-semibold text-white">
          {user?.fullname}
        </h2>

        <div className="space-y-8 mt-8">
          <button
            onClick={() => {
              handleComponent("Home");
            }}
            className=" flex  items-center space-x-5 text-center text-white text-lg px-4 py-2  hover:bg-slate-600 duration-300 rounded-xl"
          >
            <p>
              <GoHomeFill size={30} />
            </p>
            <p>Home</p>
          </button>
          <button
            onClick={() => {
              handleComponent("Dashboard");
            }}
            className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
          >
            <p>
              <BiSolidDashboard size={30} />
            </p>
            <p>Dashboard</p>
          </button>
          <button
            onClick={() => {
              handleComponent("Income");
            }}
            className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
          >
            <p>
              <FaMoneyBillTrendUp size={30} />
            </p>
            <p>Income</p>
          </button>
          <button
            onClick={() => {
              handleComponent("Expense");
            }}
            className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
          >
            <p>
              <PiHandWithdrawFill size={30} />
            </p>
            <p>Expense</p>
          </button>
          <button
            onClick={handleLogout}
            className="flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
          >
            <p>
              <RiLogoutBoxFill size={30} />
            </p>
            <p>Logout</p>
          </button>
        </div>
      </div>

      <div className=" md:hidden  navbar bg-base-300 rounded-box">
        <div className="flex-1 px-2 lg:flex-none">
          {/* <a className="text-lg font-bold">daisyUI</a> */}
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-500 to-red-300 tracking-widest">
            Fin-Edge
          </h2>
        </div>
        <div className="space-x-2">
          <img
            className="w-16 h-16 border rounded-full object-cover"
            src={user?.photo?.url}
            alt="User image"
          />
          <p>{user?.fullname}</p>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            {/* <a className="btn btn-ghost rounded-btn">Button</a> */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                <RiMenuFold4Line className="w-10 h-10" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <button
                  onClick={() => {
                    handleComponent("Home");
                  }}
                  className=" flex  items-center space-x-5 text-center text-white text-lg px-4 py-2  hover:bg-slate-600 duration-300 rounded-xl"
                >
                  <p>
                    <GoHomeFill size={30} />
                  </p>
                  <p>Home</p>
                </button>
                <button
                  onClick={() => {
                    handleComponent("Dashboard");
                  }}
                  className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
                >
                  <p>
                    <BiSolidDashboard size={30} />
                  </p>
                  <p>Dashboard</p>
                </button>
                <button
                  onClick={() => {
                    handleComponent("Income");
                  }}
                  className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
                >
                  <p>
                    <FaMoneyBillTrendUp size={30} />
                  </p>
                  <p>Income</p>
                </button>
                <button
                  onClick={() => {
                    handleComponent("Expense");
                  }}
                  className=" flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
                >
                  <p>
                    <PiHandWithdrawFill size={30} />
                  </p>
                  <p>Expense</p>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex  items-center space-x-5 text-white text-lg px-4 py-2 hover:bg-slate-600 rounded-xl"
                >
                  <p>
                    <RiLogoutBoxFill size={30} />
                  </p>
                  <p>Logout</p>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
