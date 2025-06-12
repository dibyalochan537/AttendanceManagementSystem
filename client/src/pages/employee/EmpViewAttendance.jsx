import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Table,
  Badge,
  Card,
  OverlayTrigger,
  Tooltip as BSTooltip,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const pieData = [
  { name: 'In Office', value: 60, color: '#28a745' },
  { name: 'On Leave', value: 25, color: '#dc3545' },
  { name: 'Work From Home', value: 15, color: '#ffc107' },
];

const holidays = [
  { date: '2025-06-15', name: 'Id-ul-Zuha' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-10-02', name: 'Gandhi Jayanti' },
];

const mockStatus = ['In Office', 'On Leave', 'Work From Home'];
const statusColors = {
  'In Office': '#28a745',
  'On Leave': '#dc3545',
  'Work From Home': '#ffc107',
};

function generateRandomStatusMap(year) {
  const statusMap = {};
  for (let month = 0; month < 12; month++) {
    const days = new Date(year, month + 1, 0).getDate();
    statusMap[month] = Array.from({ length: days }, () =>
      mockStatus[Math.floor(Math.random() * 3)]
    );
  }
  return statusMap;
}

export default function EmpViewAttendance() {
  const [searchText, setSearchText] = useState('');
  const [dateOrder, setDateOrder] = useState('asc');
  const [timeOrder, setTimeOrder] = useState('asc');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const statusMap = generateRandomStatusMap(selectedYear);

  // Generate last 5 months' attendance bar chart data
  const getLast5MonthAttendance = () => {
    const currentMonth = new Date().getMonth();
    const data = [];
    for (let i = 4; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const days = statusMap[monthIndex] || [];
      const inOfficeDays = days.filter((s) => s === 'In Office').length;
      data.push({
        month: new Date(selectedYear, monthIndex).toLocaleString('default', { month: 'short' }),
        InOffice: inOfficeDays,
      });
    }
    return data;
  };

  return (
    <>
      <Container fluid className="p-3 bg-light rounded shadow-sm" style={{ width: '96%', marginTop: '10px' }}>
        <Row className="g-3 align-items-center">
          <Col xs={12} md={2}>
            <div className="d-flex align-items-center">
              <FaSearch className="me-2" />
              <strong>Search Name</strong>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter employee name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={6} md={2}>
            <Form.Select value={dateOrder} onChange={(e) => setDateOrder(e.target.value)}>
              <option value="asc">Sort by Date ↑</option>
              <option value="desc">Sort by Date ↓</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Form.Select value={timeOrder} onChange={(e) => setTimeOrder(e.target.value)}>
              <option value="asc">Sort by Time ↑</option>
              <option value="desc">Sort by Time ↓</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={2}>
            <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </Col>
        </Row>
      </Container>

      <Container fluid className="p-4">
        <Row className="mb-3 justify-content-end">
          <Col xs="auto">
            <Badge bg="danger">On Leave</Badge>{' '}
            <Badge bg="success">In Office</Badge>{' '}
            <Badge bg="warning">Work From Home</Badge>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-4">
            <Card className="shadow" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Card.Body>
                <Card.Title>Attendance Percentage</Card.Title>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Card.Body>
                <Card.Title>Last 5 Months Attendance (In Office)</Card.Title>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={getLast5MonthAttendance()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="InOffice" fill="#28a745" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="shadow" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Card.Body>
                <Card.Title>Holiday List</Card.Title>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Holiday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidays.map((holiday, index) => (
                      <tr key={index}>
                        <td>{holiday.date}</td>
                        <td>{holiday.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12} md={3} className="mb-3">
            <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow" style={{ maxHeight: '300px', overflow: 'auto' }}>
              <Card.Body>
                <Card.Title>Attendance Map - {selectedYear}</Card.Title>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Month</th>
                      {[...Array(31)].map((_, i) => (
                        <th key={i}>{i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(statusMap).map(([month, days]) => (
                      <tr key={month}>
                        <td>{new Date(selectedYear, month).toLocaleString('default', { month: 'long' })}</td>
                        {[...Array(31)].map((_, i) => {
                          const status = days[i];
                          return (
                            <td
                              key={i}
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={<BSTooltip>{status || 'No Data'}</BSTooltip>}
                              >
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '24px',
                                    height: '24px',
                                    lineHeight: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: status ? statusColors[status] : 'transparent',
                                    color: status ? '#fff' : '#000',
                                    textAlign: 'center'
                                  }}
                                >
                                  {status ? i + 1 : ''}
                                </span>
                              </OverlayTrigger>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
