import React, { useState, useRef } from 'react';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaDownload, FaEdit, FaSearch } from 'react-icons/fa';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const employees = [
  {
    id: 1,
    name: "Raju Dash",
    profilePic: "https://i.pravatar.cc/40?img=1",
    department: "Engineering",
    designation: "Frontend Developer",
    phone: "9876543210",
    email: "raju@example.com"
  },
  {
    id: 2,
    name: "Neha Singh",
    profilePic: "https://i.pravatar.cc/40?img=2",
    department: "Finance",
    designation: "Accountant",
    phone: "8765432109",
    email: "neha@example.com"
  },
  {
    id: 3,
    name: "Amit Kumar",
    profilePic: "https://i.pravatar.cc/40?img=3",
    department: "HR",
    designation: "HR Manager",
    phone: "7654321098",
    email: "amit@example.com"
  },
  {
    id: 4,
    name: "Suman Roy",
    profilePic: "https://i.pravatar.cc/40?img=4",
    department: "Design",
    designation: "UI/UX Designer",
    phone: "9876543212",
    email: "suman@example.com"
  },
  {
    id: 5,
    name: "Priya Mehta",
    profilePic: "https://i.pravatar.cc/40?img=5",
    department: "QA",
    designation: "Test Engineer",
    phone: "9876543213",
    email: "priya@example.com"
  }
];

const AdminEmployeeAttendance = () => {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('id');
  const [selected, setSelected] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [bulkAttendance, setBulkAttendance] = useState('');

  const tableRef = useRef(null);

  const filteredEmployees = employees
    .filter(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search) ||
      emp.phone.includes(search) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'id') return a.id - b.id;
      if (sortOption === 'az') return a.name.localeCompare(b.name);
      if (sortOption === 'za') return b.name.localeCompare(a.name);
      return 0;
    });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filteredEmployees.map(emp => emp.id));
    } else {
      setSelected([]);
    }
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAttendanceChange = (id, value) => {
    setAttendance(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const applyBulkAttendance = () => {
    if (!bulkAttendance) return;
    const updated = { ...attendance };
    selected.forEach(id => {
      updated[id] = bulkAttendance;
    });
    setAttendance(updated);
  };

  return (
    <div className="container-fluid" style={{ flex: "1",marginTop:"10px"}}>
      {/* Filters */}
      <div className="d-flex justify-content-between flex-wrap mb-3 gap-2">
        <InputGroup style={{ maxWidth: '400px' }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl
            placeholder="Search by ID, Name, Phone, Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="id">Sort by ID</option>
          <option value="az">Sort A-Z</option>
          <option value="za">Sort Z-A</option>
        </Form.Select>

        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ maxWidth: '200px' }}
          disabled={submitted}
        />
      </div>

      {/* Bulk Attendance Selector */}
      <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
        <Form.Select
          value={bulkAttendance}
          onChange={(e) => setBulkAttendance(e.target.value)}
          style={{ maxWidth: '200px' }}
          disabled={submitted}
        >
          <option value="">Apply Attendance</option>
          <option value="inOffice">🏢 In Office</option>
          <option value="inLeave">🌴 Leave</option>
          <option value="inWorkFromHome">🏠 Work From Home</option>
        </Form.Select>
        <Button
          variant="outline-primary"
          onClick={applyBulkAttendance}
          disabled={submitted || selected.length === 0 || !bulkAttendance}
        >
          Apply to Selected
        </Button>
      </div>

      {/* Scrollable Table */}
      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <Table ref={tableRef} hover responsive>
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  checked={
                    filteredEmployees.length > 0 &&
                    selected.length === filteredEmployees.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Profile</th>
              <th>ID</th>
              <th>Name</th>
              <th>Dept</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <Form.Check
                    checked={selected.includes(emp.id)}
                    onChange={() => toggleSelect(emp.id)}
                  />
                </td>
                <td>
                  <img src={emp.profilePic} alt={emp.name} width="40" className="rounded-circle" />
                </td>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.phone}</td>
                <td>
                  {!submitted ? (
                    <Form.Select
                      value={attendance[emp.id] || ''}
                      onChange={(e) => handleAttendanceChange(emp.id, e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option value="inOffice">🏢 In Office</option>
                      <option value="inLeave">🌴 Leave</option>
                      <option value="inWorkFromHome">🏠 WFH</option>
                    </Form.Select>
                  ) : (
                    <span
                      className={`badge ${
                        attendance[emp.id] === 'inOffice'
                          ? 'bg-success'
                          : attendance[emp.id] === 'inLeave'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {attendance[emp.id]?.replace('in', '') || 'N/A'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">No matching employees.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center mt-3 gap-3 flex-wrap">
        {!submitted ? (
          <Button variant="primary" onClick={handleSubmit}>
            ✅ Submit
          </Button>
        ) : (
          <>
            <Button variant="warning" onClick={handleEdit}>
              <FaEdit /> Edit
            </Button>
            <DownloadTableExcel
              filename={`attendance_${selectedDate}`}
              sheet="Attendance"
              currentTableRef={tableRef.current}
            >
              <Button variant="success">
                <FaDownload /> Export
              </Button>
            </DownloadTableExcel>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeAttendance;
