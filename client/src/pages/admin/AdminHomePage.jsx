import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "../../components/MyNavBar.jsx";
import AdminSideBar from "../../components/AdminSideBar.jsx";
import "../../PagesCSS/AdminHomePage.css";
import Setting from "../../components/Setting.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminEmployeeManagement from "./AdminEmployeeManagement.jsx"
import AdminEmployeeAttendance from "./AdminEmployeeAttedance.jsx"
import AdminLeaveOvertime from "./AdminLeaveOvertime.jsx"
import AdminHolidayCalendar from "./AdminHolidayCalender.jsx"

export default function AdminHomePage() {
  const [activePageId, setActivePageId] = useState("1");
  const [data, setData] = useState(null);

  const renderActivePage = () => {
    switch (activePageId) {
      case "1":
        return <AdminDashboard />;
      case "2":
        return <AdminEmployeeManagement />;
      case "3":
        return <AdminEmployeeAttendance />;
      case "4":
        return <AdminLeaveOvertime />;
      case "5":
        return <AdminHolidayCalendar />;
      case "6":
        return <div>Performance</div>;
      case "7":
        return <Setting />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="admin-home-page">
      <div className="admin-sidebar">
        <AdminSideBar setActivePageId={setActivePageId} activePageId={activePageId} />
      </div>
      <div className="admin-main-content">
        <MyNavBar />
        <div id="homepageMainContentForAll">
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
}
