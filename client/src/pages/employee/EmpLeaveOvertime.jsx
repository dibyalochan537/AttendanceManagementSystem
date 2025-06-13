import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Badge,
  Tabs,
  Tab,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EmpLeaveOvertime() {
  const [leaveForm, setLeaveForm] = useState({ date: '', days: '', reason: '' });
  const [otForm, setOtForm] = useState({ date: '', hours: '', reason: '' });

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [overtimeHistory, setOvertimeHistory] = useState([]);

  const leaveStats = {
    cl: 12,
    availableCl: 6,
    pl: 10,
    availablePl: 4,
    sick: 8,
    availableSick: 5,
  };

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleOtChange = (e) => {
    const { name, value } = e.target;
    setOtForm({ ...otForm, [name]: value });
  };

  const getStatusVariant = (status) => {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'danger';
    return 'warning';
  };

  const submitLeave = () => {
    if (!leaveForm.date || !leaveForm.days || !leaveForm.reason) {
      alert('Please fill all leave fields');
      return;
    }

    const newLeave = {
      id: Date.now(),
      type: 'Leave',
      date: leaveForm.date,
      days: leaveForm.days,
      reason: leaveForm.reason,
      status: 'Pending',
    };

    setLeaveHistory([newLeave, ...leaveHistory]);
    setLeaveForm({ date: '', days: '', reason: '' });
    alert('Leave Request Submitted');
  };

  const submitOvertime = () => {
    if (!otForm.date || !otForm.hours || !otForm.reason) {
      alert('Please fill all overtime fields');
      return;
    }

    const newOt = {
      id: Date.now(),
      type: 'Overtime',
      date: otForm.date,
      hours: otForm.hours,
      reason: otForm.reason,
      status: 'Pending',
    };

    setOvertimeHistory([newOt, ...overtimeHistory]);
    setOtForm({ date: '', hours: '', reason: '' });
    alert('Overtime Request Submitted');
  };

  return (
    <Container fluid className="p-4">
      {/* Leave Summary Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Casual Leave</Card.Title>
              <h5>Total: {leaveStats.cl}</h5>
              <h6>Available: {leaveStats.availableCl}</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Paid Leave</Card.Title>
              <h5>Total: {leaveStats.pl}</h5>
              <h6>Available: {leaveStats.availablePl}</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Sick Leave</Card.Title>
              <h5>Total: {leaveStats.sick}</h5>
              <h6>Available: {leaveStats.availableSick}</h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Forms Section */}
      <Row className="mb-4">
        {/* Leave Request Form */}
        <Col md={6} className="mb-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Request Leave</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Leave Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={leaveForm.date}
                    onChange={handleLeaveChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Days</Form.Label>
                  <Form.Control
                    type="number"
                    name="days"
                    value={leaveForm.days}
                    onChange={handleLeaveChange}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="reason"
                    value={leaveForm.reason}
                    onChange={handleLeaveChange}
                  />
                </Form.Group>
                <Button
                  onClick={submitLeave}
                  variant="primary"
                  disabled={!leaveForm.date || !leaveForm.days || !leaveForm.reason}
                >
                  Submit Leave Request
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Overtime Request Form */}
        <Col md={6} className="mb-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Request Overtime</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Overtime Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={otForm.date}
                    onChange={handleOtChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Hours</Form.Label>
                  <Form.Control
                    type="number"
                    name="hours"
                    value={otForm.hours}
                    onChange={handleOtChange}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="reason"
                    value={otForm.reason}
                    onChange={handleOtChange}
                  />
                </Form.Group>
                <Button
                  onClick={submitOvertime}
                  variant="success"
                  disabled={!otForm.date || !otForm.hours || !otForm.reason}
                >
                  Submit Overtime Request
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Leave & Overtime History */}
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Tabs defaultActiveKey="leave" id="status-tabs" className="mb-3">
                <Tab eventKey="leave" title="Leave Status">
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveHistory.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No leave requests yet
                          </td>
                        </tr>
                      ) : (
                        leaveHistory.map((item) => (
                          <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.days}</td>
                            <td>{item.reason}</td>
                            <td>
                              <Badge bg={getStatusVariant(item.status)}>{item.status}</Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Tab>

                <Tab eventKey="overtime" title="Overtime Status">
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Hours</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overtimeHistory.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No overtime requests yet
                          </td>
                        </tr>
                      ) : (
                        overtimeHistory.map((item) => (
                          <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.hours}</td>
                            <td>{item.reason}</td>
                            <td>
                              <Badge bg={getStatusVariant(item.status)}>{item.status}</Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
