import EmpSideBar from "../../components/EmpSideBar.jsx";
import MyNavBar from "../../components/MyNavBar.jsx";
import Setting from "../../components/Setting.jsx";
import EmpDashboard from "./EmpDashboard.jsx";
import EmpViewAttendance from "./EmpViewAttendance.jsx";
import EmpLeaveOvertime from "./EmpLeaveOvertime.jsx";
import React, { useState,useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../PagesCSS/AdminHomePage.css";
import AdminSideBar from "../../components/AdminSideBar.jsx";

export default function EmpHomePage(){
    const [activePageId, setActivePageId] = useState("1");
    const [data, setData] = useState(null);
    const sidebarRef = useRef(null);

    const renderActivePage = () => {
        switch (activePageId) {
        case "1":
            return <EmpDashboard />;
        case "2":
            return <EmpViewAttendance />;
        case "3":
            return <EmpLeaveOvertime />;
        case "4":
            return <Setting />;
        default:
            return <div>Select a page</div>;
        }
    };
     const openCloseSideBar = (status) => {
        if (!sidebarRef.current) return;
        sidebarRef.current.style.left = status ? "0" : "-250px";
    };
    return(
        <>
        <div className="admin-home-page">
              <div className="admin-sidebar" id="sideBarAllData" ref={sidebarRef}>
                <EmpSideBar
                  setActivePageId={setActivePageId}
                  activePageId={activePageId}
                  openCloseSideBar={openCloseSideBar}
                />
              </div>
              <div className="admin-main-content">
                <MyNavBar openCloseSideBar={openCloseSideBar} />
                <div id="homepageMainContentForAll">
                  {renderActivePage()}
                </div>
              </div>
            </div>
        </>
    );
}