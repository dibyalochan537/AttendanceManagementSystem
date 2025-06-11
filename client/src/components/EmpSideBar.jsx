import React,{useState} from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import { FcLeave } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";

function EmpSideBar({ setActivePageId, activePageId }) {
  const [title, setTitle] = useState('Default Title');
  const getIconStyle = (id) => ({
    fontSize: "clamp(32px, 3vw, 48px)",
    padding: "0.6vw",
    borderRadius: "12px",
    backgroundColor: activePageId === id ? "rgba(255, 255, 255, 0.25)" : "transparent",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "0 0.5vw",
  });

  const handleClick = (id,tabTitle) => {
    setActivePageId(id);
    const newTitle =tabTitle;
    setTitle(tabTitle);
    document.title = tabTitle;
  };

  return (
    <>
      <FaHome style={getIconStyle("1")} onClick={() => handleClick("1","Dashboard")} />
      <ImAddressBook style={getIconStyle("2")} onClick={() => handleClick("2","My Attendance")} />
      <FcLeave style={getIconStyle("3")} onClick={() => handleClick("3","My Leave")} />
      <IoSettingsSharp  style={getIconStyle("4")} onClick={() => handleClick("4","Setting")} />
    </>
  );
}

export default EmpSideBar;
