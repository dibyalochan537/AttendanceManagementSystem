import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Container, Row, Col, Modal, FormControl, Popover, OverlayTrigger } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

import profileImage from "/vite.svg";  // Replace with your actual profile image path
import companyLogo from "/vite.svg";   // Replace with your actual logo path
import "../ComponentCSS/MyNavBar.css"
export default function MyNavbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const company = {
    estdDate: '2010-05-20',
    name: 'Tech Corp',
    id: 'TC12345',
    owner: 'Jane Doe',
    category: 'Software Development',
    employeeCount: 150,
  };

  const handleLogout = () => {
    alert('Logging out...');
    setModalOpen(false);
    // Add your logout logic here
  };

  const handleSettings = () => {
    alert('Go to settings...');
    setModalOpen(false);
    // Navigate to settings page or open settings modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSearchPopup(e.target.value.length > 0);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const renderSearchPopover = (
    <Popover id="search-popover">
      <Popover.Header as="h3">Search Results</Popover.Header>
      <Popover.Body>
        <p>Search by name, email, phone, ID.</p>
        <ul>
          <li>Result 1 for: {searchTerm}</li>
          <li>Result 2 for: {searchTerm}</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className='nav-bar-top-div d-flex align-items-center justify-content-between p-2 shadow-sm ' style={{height:'5vh',flex:"1",backgroundColor:"rgba(33, 33, 36, 0.527);"}}>

        {/* Search Bar */}
        <OverlayTrigger
          show={showSearchPopup}
          placement="bottom"
          overlay={renderSearchPopover}
        >
          <div className="d-flex align-items-center bg-white rounded px-2 py-1 mx-2" style={{ width: '40%' }}>
            <FormControl
              type="text"
              placeholder="Search..."
              className="FaSearch border-0"
              size="sm"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ boxShadow: 'none' }}
            />
            <FaSearch style={{ color: 'gray', marginLeft: '5px' }} />
          </div>
        </OverlayTrigger>

        {/* Notification + Profile */}
        <div className="d-flex align-items-center gap-3">
          <BsBell size={20} style={{ cursor: "pointer" }} />
          <img
            src={profileImage}
            alt="Profile"
            style={{ width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal for Company Info */}
      <CompanyModal
        show={showModal}
        handleClose={handleModalClose}
        title="Company Logo Modal"
        body={<p>Show your company logo info here.</p>}
      />

      {/* Modal for Profile Settings */}
      <CompanyModal
        show={modalOpen}
        handleClose={() => setModalOpen(false)}
        title="User Settings"
        body={
          <>
            <p><strong>Company Name:</strong> {company.name}</p>
            <p><strong>Owner:</strong> {company.owner}</p>
            <p><strong>Category:</strong> {company.category}</p>
            <p><strong>Employee Count:</strong> {company.employeeCount}</p>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={handleSettings}>Settings</Button>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
          </>
        }
      />
    </>
  );
}

// Reusable Modal Component
function CompanyModal({ show, handleClose, title, body }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}
