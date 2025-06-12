import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, InputGroup, FormControl } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const initialEmployees = [
  {
    id: 1,
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    dept: "Sales",
    designation: "Manager",
    phone: "123-456-7890",
    email: "john@example.com",
  },
  {
    id: 2,
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane Smith",
    dept: "Marketing",
    designation: "Executive",
    phone: "987-654-3210",
    email: "jane@example.com",
  },
  // Add more dummy employees here
];

const AdminEmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortOption, setSortOption] = useState("name-asc");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [currentEmp, setCurrentEmp] = useState(null);

  // Filter and sort employees based on search and sort options
  const filteredEmployees = employees
    .filter((emp) => {
      const fieldVal = (emp[searchField] || "").toString().toLowerCase();
      return fieldVal.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "id-asc") return a.id - b.id;
      if (sortOption === "id-desc") return b.id - a.id;
      return 0;
    });

  // Toggle selection of a single employee
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Select/Deselect all visible employees
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEmployees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEmployees.map((e) => e.id)));
    }
  };

  // Delete selected employees
  const deleteSelected = () => {
    if (selectedIds.size === 0) {
      alert("No employees selected for deletion.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.size} selected employee(s)?`)) {
      setEmployees((prev) => prev.filter((e) => !selectedIds.has(e.id)));
      setSelectedIds(new Set());
    }
  };

  // Delete single employee by id
  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Handle Add Employee form submit
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEmp = {
      id: employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
      profilePic: form.profilePic.value || "https://via.placeholder.com/40",
      name: form.name.value,
      dept: form.dept.value,
      designation: form.designation.value,
      phone: form.phone.value,
      email: form.email.value,
    };
    setEmployees((prev) => [...prev, newEmp]);
    setShowAddModal(false);
  };

  // Handle Edit Employee submit
  const handleEditEmployee = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEmp = {
      ...currentEmp,
      profilePic: form.profilePic.value || "https://via.placeholder.com/40",
      name: form.name.value,
      dept: form.dept.value,
      designation: form.designation.value,
      phone: form.phone.value,
      email: form.email.value,
    };
    setEmployees((prev) => prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp)));
    setShowEditModal(false);
  };

  // Handle Add Bulk employees submit (CSV text or multiline input)
  const handleAddBulkEmployees = (e) => {
    e.preventDefault();
    const form = e.target;
    const bulkText = form.bulkData.value.trim();
    if (!bulkText) return;

    // Assume CSV format: name,email,phone,dept,designation,profilePic(optional)
    // One employee per line
    const lines = bulkText.split("\n");
    const newEmps = lines.map((line, i) => {
      const [name, email, phone, dept, designation, profilePic] = line.split(",").map((s) => s.trim());
      return {
        id: employees.length + i + 1,
        name,
        email,
        phone,
        dept,
        designation,
        profilePic: profilePic || "https://via.placeholder.com/40",
      };
    });

    setEmployees((prev) => [...prev, ...newEmps]);
    setShowBulkModal(false);
  };

  return (
    <div className="w-100 px-3 my-4" style={{overflow:'scroll',height:'100%'}}>
      <h2 className="mb-4" style={{fontFamily:'Times New Roman'}}>Manage Employees</h2>

      {/* Top Buttons and Search */}
      <div className=" mb-3 gap-2"  style={{display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"end"}}>
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="danger" onClick={deleteSelected}>
            Delete Selected Employee
          </Button>
          <Button
            variant="success"
            onClick={() => alert("Export functionality not implemented")}
          >
            Export
          </Button>
          <Button variant="info" onClick={() => setShowBulkModal(true)}>
            Add in Bulk
          </Button>
          <Button variant="secondary" onClick={() => setShowAddModal(true)}>
            Add Employee
          </Button>
        </div>

        <InputGroup className="w-100 w-md-50 mt-2 mt-md-0">
          <Form.Select
            style={{ maxWidth: "130px" }}
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </Form.Select>
          <FormControl
            placeholder={`Search by ${searchField}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Form.Select
            style={{ maxWidth: "130px" }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="id-asc">ID Asc</option>
            <option value="id-desc">ID Desc</option>
          </Form.Select>
        </InputGroup>
      </div>

      {/* Employee Table */}
      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={
                  filteredEmployees.length > 0 &&
                  selectedIds.size === filteredEmployees.length
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th>Profile Pic</th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Designation</th>
            <th>Phone</th>
            <th>Email</th>
            <th style={{ minWidth: 110 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center">
                No employees found.
              </td>
            </tr>
          )}
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedIds.has(emp.id)}
                  onChange={() => toggleSelect(emp.id)}
                />
              </td>
              <td>
                <img
                  src={emp.profilePic}
                  alt={emp.name}
                  className="rounded-circle"
                  width={40}
                  height={40}
                />
              </td>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.dept}</td>
              <td>{emp.designation}</td>
              <td>{emp.phone}</td>
              <td>{emp.email}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-1"
                  title="Edit"
                  onClick={() => {
                    setCurrentEmp(emp);
                    setShowEditModal(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-1"
                  title="View"
                  onClick={() => {
                    setCurrentEmp(emp);
                    setShowViewModal(true);
                  }}
                >
                  <FaEye />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  title="Delete"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
  <Form onSubmit={handleAddEmployee}>
    <Modal.Header closeButton>
      <Modal.Title>Add Employee</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formAddProfilePic">
        <Form.Label>Profile Picture URL</Form.Label>
        <Form.Control type="url" name="profilePic" placeholder="https://..." />
        <Form.Text className="text-muted">
          Optional - leave blank to use default
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddName">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" name="name" placeholder="Employee Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" name="email" placeholder="email@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control required type="tel" name="phone" placeholder="Phone number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddDept">
        <Form.Label>Department</Form.Label>
        <Form.Select name="dept" required>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Service">Service</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddDesignation">
        <Form.Label>Designation</Form.Label>
        <Form.Select name="designation" required>
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </Form.Select>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowAddModal(false)}>
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        Add Employee
      </Button>
    </Modal.Footer>
  </Form>
</Modal>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        {currentEmp && (
          <Form onSubmit={handleEditEmployee}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Employee - ID {currentEmp.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formEditProfilePic">
                <Form.Label>Profile Picture URL</Form.Label>
                <Form.Control
                  type="url"
                  name="profilePic"
                  defaultValue={currentEmp.profilePic}
                />
                <Form.Text className="text-muted">
                  Optional - leave blank to use default
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  defaultValue={currentEmp.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  defaultValue={currentEmp.email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="phone"
                  defaultValue={currentEmp.phone}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditDept">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="dept"
                  defaultValue={currentEmp.dept}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="designation"
                  defaultValue={currentEmp.designation}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      {/* View Employee Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        {currentEmp && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Employee Details - ID {currentEmp.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center mb-3">
                <img
                  src={currentEmp.profilePic}
                  alt={currentEmp.name}
                  className="rounded-circle"
                  width={80}
                  height={80}
                />
              </div>
              <p><strong>Name:</strong> {currentEmp.name}</p>
              <p><strong>Email:</strong> {currentEmp.email}</p>
              <p><strong>Phone:</strong> {currentEmp.phone}</p>
              <p><strong>Department:</strong> {currentEmp.dept}</p>
              <p><strong>Designation:</strong> {currentEmp.designation}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Add Bulk Modal */}
      <Modal show={showBulkModal} onHide={() => setShowBulkModal(false)} size="lg" centered>
        <Form onSubmit={handleAddBulkEmployees}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employees in Bulk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Enter one employee per line, comma separated: <br />
              <code>name,email,phone,dept,designation,profilePic(optional)</code>
            </p>
            <Form.Group controlId="formBulkData">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder={`Example:\nAlice,a@example.com,555-1234,HR,Manager,https://...`}
                name="bulkData"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBulkModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Employees
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminEmployeeManagement;
