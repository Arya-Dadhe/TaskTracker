import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { VscPinned } from "react-icons/vsc";
import { FaCheckDouble } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [MobileNav, setMobileNav] = useState("hidden");
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Pinned",
      icon: <VscPinned />,
      link: "/PinnedTasks",
    },
    {
      title: "Completed",
      icon: <FaCheckDouble />,
      link: "/CompletedTasks",
    },
    {
      title: "Ongoing",
      icon: <GrInProgress />,
      link: "/OngoingTasks",
    },
  ];
  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://taskback-eosin.vercel.app/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-[#333]">{Data.email}</h4>
          <hr style={{ border: 'none', height: '2px', backgroundColor: '#333' }}/>
        </div>
      )}
      <div className="my-4 text-[#333]  md:hidden flex items-center justify-end">
        <button
          className="text-2xl"
          onClick={() => {
            MobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden");
          }}
        >
          {MobileNav === "hidden" ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      </div>
      <div className={`${MobileNav} md:block`}>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-300 p-2 rounded transition-all duration-300"
          >
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>

      <div>
        <button className="text-2xl text-[#333] w-full my-2 flex items-center hover:bg-gray-300 p-2 rounded transition-all duration-300" onClick={logout}>
          <SlLogout />&nbsp;
          Log Out{" "}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
