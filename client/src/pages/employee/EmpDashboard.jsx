import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  ProgressBar
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom CSS (you can also move this to a separate CSS file)
const cardStyle = {
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
};

const cardBodyStyle = {
  overflowY: 'auto',
  flexGrow: 1,
  paddingRight: '10px'
};

export default function EmpDashboard() {
  return (
    <Container fluid className="p-4">
      <h4 className="mb-3" style={{fontFamily:"times of roman",fontWeight:"700"}}>Dashboard/</h4>

      <Row className="gy-4">
        {/* Timesheet */}
        <Col md={4}>
          <Card className="p-3 shadow-sm" style={cardStyle}>
            <div style={cardBodyStyle}>
              <h5>Timesheet <small className="text-muted">11 Mar 2019</small></h5>
              <p className="mt-3 mb-1">Punch in at</p>
              <div className="mb-3 text-muted">Wed, 11th Mar 2019 10:00 AM</div>
              <div className="text-center">
                <div
                  style={{
                    width: 120,
                    height: 120,
                    margin: 'auto'
                  }}
                  className="position-relative"
                >
                  <div
                    className="position-absolute top-50 start-50 translate-middle fw-bold fs-5"
                    style={{ zIndex: 1 }}
                  >
                    3.45 hrs
                  </div>
                  <ProgressBar now={43} variant="info" style={{ height: 120, borderRadius: '50%' }} />
                </div>
                <Button variant="success" className="mt-3">Punch Out</Button>
                <Row className="mt-3 text-center">
                  <Col><div className="text-muted">BREAK</div><div>1.21 hrs</div></Col>
                  <Col><div className="text-muted">Overtime</div><div>3 hrs</div></Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>

        {/* Statistics */}
        <Col md={4}>
          <Card className="p-3 shadow-sm" style={cardStyle}>
            <div style={cardBodyStyle}>
              <h5>Statistics</h5>
              <div className="my-2">Today <ProgressBar now={43} label="3.45 / 8 hrs" /></div>
              <div className="my-2">This Week <ProgressBar variant="warning" now={70} label="28 / 40 hrs" /></div>
              <div className="my-2">This Month <ProgressBar variant="danger" now={56} label="90 / 160 hrs" /></div>
              <div className="my-2">Remaining <ProgressBar variant="info" now={56} label="90 / 160 hrs" /></div>
              <div className="my-2">Overtime <ProgressBar variant="warning" now={5} label="5 hrs" /></div>
            </div>
          </Card>
        </Col>

        {/* Today Activity */}
        <Col md={4}>
          <Card className="p-3 shadow-sm" style={cardStyle}>
            <div style={cardBodyStyle}>
              <h5>Today Activity</h5>
              <ul className="list-unstyled mt-3">
                {[
                  "10:00 AM", "11:00 AM", "11:30 AM", "01:30 PM", "02:30 PM", "04:15 PM",
                  "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
                ].map((time, i) => (
                  <li className="d-flex align-items-center mb-2" key={i}>
                    <div className="me-2 bg-success rounded-circle" style={{ width: 10, height: 10 }}></div>
                    <span>{i % 2 === 0 ? 'Punch In at ' : 'Punch Out at '}{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Col>

        {/* Attendance List */}
        <Col md={8}>
          <Card className="p-3 shadow-sm" style={cardStyle}>
            <div style={cardBodyStyle}>
              <h5>Attendance List</h5>
              <Table responsive bordered className="mt-3">
                <thead>
                  <tr>
                    <th>S. No</th>
                    <th>Date</th>
                    <th>Punch In</th>
                    <th>Punch Out</th>
                    <th>Production</th>
                    <th>Break</th>
                    <th>Overtime</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{19 + i} Feb 2019</td>
                      <td>10 AM</td>
                      <td>7 PM</td>
                      <td>9 hrs</td>
                      <td>1 hrs</td>
                      <td>{i % 3 === 0 ? '2 hrs' : '0 hrs'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>

        {/* Daily Records Chart Placeholder */}
        <Col md={4}>
          <Card className="p-3 shadow-sm" style={cardStyle}>
            <div style={cardBodyStyle}>
              <h5>Daily Records</h5>
              <div className="mt-4 text-center text-muted">[Chart Placeholder]</div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
