// ✅ AdminHomePage.jsx
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "../../components/MyNavBar.jsx";
import AdminSideBar from "../../components/AdminSideBar.jsx";
import "../../PagesCSS/AdminHomePage.css";
import AdminSetting from "./AdminSetting.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminEmployeeManagement from "./AdminEmployeeManagement.jsx";
import AdminEmployeeAttendance from "./AdminEmployeeAttedance.jsx";
import AdminLeaveOvertime from "./AdminLeaveOvertime.jsx";
import AdminHolidayCalendar from "./AdminHolidayCalender.jsx";

export default function AdminHomePage() {
  const [activePageId, setActivePageId] = useState("1");
  const sidebarRef = useRef(null);

  const renderActivePage = () => {
    switch (activePageId) {
      case "1": return <AdminDashboard />;
      case "2": return <AdminEmployeeManagement />;
      case "3": return <AdminEmployeeAttendance />;
      case "4": return <AdminLeaveOvertime />;
      case "5": return <AdminHolidayCalendar />;
      case "6": return <div>Performance</div>;
      case "7": return <AdminSetting />;
      default: return <div>Select a page</div>;
    }
  };

  const openCloseSideBar = (status) => {
    if (!sidebarRef.current) return;
    sidebarRef.current.style.left = status ? "0" : "-250px";
  };

  return (
    <div className="admin-home-page" >
      <div className="admin-sidebar" id="sideBarAllData" ref={sidebarRef}>
        <AdminSideBar
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
  );
}
