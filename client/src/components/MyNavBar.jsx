import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Modal, Button, FormControl, OverlayTrigger, Popover } from "react-bootstrap";
import "../ComponentCSS/MyNavBar.css";
import profileImage from "/vite.svg";

export default function MyNavbar({ openCloseSideBar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const company = {
    name: 'Tech Corp',
    owner: 'Jane Doe',
    category: 'Software Development',
    employeeCount: 150,
  };

  const renderSearchPopover = (
    <Popover id="search-popover">
      <Popover.Header as="h3">Search Results</Popover.Header>
      <Popover.Body>
        <ul>
          <li>Result 1 for: {searchTerm}</li>
          <li>Result 2 for: {searchTerm}</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className='nav-bar-top-div d-flex align-items-center justify-content-between p-2 shadow-sm' style={{ height: '5vh' }}>
        <div className="nav-menu-item" onClick={() => openCloseSideBar(true)}>
          <IoMenu style={{ cursor: 'pointer' }} />
        </div>

        <OverlayTrigger show={showSearchPopup} placement="bottom" overlay={renderSearchPopover}>
          <div className="d-flex align-items-center bg-white rounded px-2 py-1 mx-2" style={{ width: '40%' }}>
            <FormControl
              type="text"
              placeholder="Search..."
              className="FaSearch border-0"
              size="sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchPopup(e.target.value.length > 0);
              }}
              style={{ boxShadow: 'none' }}
            />
            <FaSearch style={{ color: 'gray', marginLeft: '5px' }} />
          </div>
        </OverlayTrigger>

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

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Company:</strong> {company.name}</p>
          <p><strong>Owner:</strong> {company.owner}</p>
          <p><strong>Category:</strong> {company.category}</p>
          <p><strong>Employees:</strong> {company.employeeCount}</p>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary">Settings</Button>
            <Button variant="danger">Logout</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
