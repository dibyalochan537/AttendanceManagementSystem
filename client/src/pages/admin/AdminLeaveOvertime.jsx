import React, { useState } from 'react';
import {
  Container,
  Table,
  Button,
  Modal,
  Badge,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockRequests = [
  {
    id: 1,
    name: 'Raju Dash',
    type: 'Leave',
    date: '2025-06-11',
    days: 3,
    reason: 'Medical appointment',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Neha Singh',
    type: 'Overtime',
    date: '2025-06-12',
    reason: 'Project delivery',
    status: 'Pending',
  },
];

function AdminLeaveOvertime() {
  const [requests, setRequests] = useState(mockRequests);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAction = (index, action) => {
    const updated = [...requests];
    updated[index] = { ...updated[index], status: action };
    setRequests(updated);
    setShowModal(false);
  };

  const openModal = (req, index) => {
    setSelectedRequest({ ...req, index });
    setShowModal(true);
  };

  const leaveRequests = requests.map((r, i) => ({ ...r, index: i })).filter((req) => req.type === 'Leave');
  const overtimeRequests = requests.map((r, i) => ({ ...r, index: i })).filter((req) => req.type === 'Overtime');

  return (
    <Container fluid className="px-2 py-3">
      <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: 'Times New Roman', color: 'red' }}>
        Leave & Overtime Requests
      </h3>
      <Row className="g-3">
        {/* Leave Requests */}
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white text-center">
              Leave Requests
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto', maxHeight: '70vh' }}>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((req, idx) => (
                    <tr key={`leave-${idx}`}>
                      <td>{idx + 1}</td>
                      <td>{req.name}</td>
                      <td>{req.date}</td>
                      <td>{req.reason}</td>
                      <td>
                        <Badge
                          bg={
                            req.status === 'Pending'
                              ? 'warning'
                              : req.status === 'Approved'
                              ? 'success'
                              : 'danger'
                          }
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td>
                        {req.status === 'Pending' ? (
                          <Button size="sm" onClick={() => openModal(req, req.index)}>
                            Review
                          </Button>
                        ) : (
                          <span className="text-success fw-semibold">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Overtime Requests */}
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white text-center">
              Overtime Requests
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto', maxHeight: '70vh' }}>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overtimeRequests.map((req, idx) => (
                    <tr key={`ot-${idx}`}>
                      <td>{idx + 1}</td>
                      <td>{req.name}</td>
                      <td>{req.date}</td>
                      <td>{req.reason}</td>
                      <td>
                        <Badge
                          bg={
                            req.status === 'Pending'
                              ? 'warning'
                              : req.status === 'Approved'
                              ? 'success'
                              : 'danger'
                          }
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td>
                        {req.status === 'Pending' ? (
                          <Button size="sm" onClick={() => openModal(req, req.index)}>
                            Review
                          </Button>
                        ) : (
                          <span className="text-success fw-semibold">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Approve/Reject */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {selectedRequest && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Review Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Name:</strong> {selectedRequest.name}</p>
              <p><strong>Type:</strong> {selectedRequest.type}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
              <p><strong>Reason:</strong> {selectedRequest.reason}</p>
              {selectedRequest.type === 'Leave' && (
                <>
                  <p><strong>Days Requested:</strong> {selectedRequest.days}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleAction(selectedRequest.index, 'Rejected')}>
                Reject
              </Button>
              <Button variant="success" onClick={() => handleAction(selectedRequest.index, 'Approved')}>
                Approve
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default AdminLeaveOvertime;
