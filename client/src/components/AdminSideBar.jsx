import React from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import { FcLeave } from "react-icons/fc";
import { IoIosTime } from "react-icons/io";
import { GiTrophyCup } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import "../ComponentCSS/AdminSideBar.css";
import "../PagesCSS/AdminHomePage.css";

export default function AdminSideBar({ setActivePageId, activePageId, openCloseSideBar }) {
  const getIconStyle = (id) => ({
    fontSize: "clamp(32px, 3vw, 48px)",
    padding: "0.6vw",
    borderRadius: "12px",
    backgroundColor: activePageId === id ? "rgba(255, 255, 255, 0.25)" : "transparent",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "0 0.5vw",
  });

  const handleClick = (id, title) => {
    setActivePageId(id);
    document.title = title;
  };

  return (
    <>
      <div id="asns-cross">
        <RxCross2 onClick={() => openCloseSideBar(false)} style={{ cursor: 'pointer' }} />
      </div>
      <div className="admin-sidebar-name-span" id="asns-dashboard">
        <FaHome style={getIconStyle("1")} onClick={() => handleClick("1", "Dashboard")} />
        <span>Dashboard</span>
      </div>
      <div className="admin-sidebar-name-span">
        <FaUsers style={getIconStyle("2")} onClick={() => handleClick("2", "Employees")} />
        <span>Employees</span>
      </div>
      <div className="admin-sidebar-name-span">
        <ImAddressBook style={getIconStyle("3")} onClick={() => handleClick("3", "Attendance")} />
        <span>Attendance</span>
      </div>
      <div className="admin-sidebar-name-span">
        <FcLeave style={getIconStyle("4")} onClick={() => handleClick("4", "Leave")} />
        <span>Leave/Overtime</span>
      </div>
      <div className="admin-sidebar-name-span">
        <IoIosTime style={getIconStyle("5")} onClick={() => handleClick("5", "Shifts")} />
        <span>Shifts</span>
      </div>
      <div className="admin-sidebar-name-span">
        <GiTrophyCup style={getIconStyle("6")} onClick={() => handleClick("6", "Performance")} />
        <span>Performance</span>
      </div>
      <div className="admin-sidebar-name-span">
        <IoSettingsSharp style={getIconStyle("7")} onClick={() => handleClick("7", "Setting")} />
        <span>Setting</span>
      </div>
    </>
  );
}
