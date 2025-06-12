import React from "react";
import {Link} from "react-router-dom"
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaCalendarAlt,
  FaDoorOpen,
  FaMobileAlt,
  FaCogs,
  FaUserEdit,
  FaUserAltSlash,
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { color } from "chart.js/helpers";

const checkInData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 200 },
  { name: "Thu", value: 278 },
  { name: "Fri", value: 189 },
];

const overtimeData = [
  { name: "Mon", value: 100 },
  { name: "Tue", value: 180 },
  { name: "Wed", value: 240 },
  { name: "Thu", value: 200 },
  { name: "Fri", value: 150 },
];

const cardData = [
  { icon: <FaUserCheck size={24} />, title: "Checked In", count: 4500 ,color:"green"},
  { icon: <FaUserTimes size={24} />, title: "Not Checked In", count: 500 ,color:"red"},
  { icon: <FaUserClock size={24} />, title: "On Leave", count: 456 ,color:"orange"},
  { icon: <FaCalendarAlt size={24} />, title: "Weekly Off", count: 145 ,color:"#0B1D51"},
  { icon: <FaCalendarAlt size={24} />, title: "Holiday", count: 12 ,color:"black"},
  { icon: <FaDoorOpen size={24} />, title: "Checked Out", count: 250 ,color:"green"},
];

export default function AdminDashboard() {
  return (  
    <Container fluid className="p-4" style={{ backgroundColor: "#f9fafa"}}>
      <h4 className="mb-4 fw-bold">Dashboard</h4>

      {/* Summary Cards */}
      <Row className="mb-4">
        {cardData.map((card, index) => (
          <Col md={2} xs={6} key={index} className="mb-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-sm text-center p-2 border-0 rounded-4" style={{backgroundColor:"#EEEFE0"}}>
                <div className="text-primary mb-2">{card.icon}</div>
                <h5 className="fw-semibold" style={{color:card.color}}>{card.count}</h5>
                <p className="small text-muted mb-0">{card.title}</p>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h6 className="fw-semibold mb-3">On Time Check-In(Weekly)</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={checkInData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0d6efd" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h6 className="fw-semibold mb-3">Overtime(Weekly)</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={overtimeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#198754" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Devices & Exceptions */}
      <Row>
        <Col md={4} className="mb-3" >
          <Card className="shadow-sm text-center border-0 rounded-4" style={{backgroundColor:"#A0C878"}}>
            <Card.Body>
              <FaMobileAlt size={24} className="text-warning mb-2" />
              <h5>0/2500</h5>
              <p className="small text-muted">Device Check-ins</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm text-center border-0 rounded-4" style={{backgroundColor:"#FA812F"}}>
            <Card.Body>
              <FaCogs size={24} className="text-info mb-2" />
              <h5>145 / 5</h5>
              <p className="small text-muted">Manual Check-ins </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm text-center border-0 rounded-4" style={{backgroundColor:"#A59D84"}}>
            <Card.Body style={{height:"133px"}}>
              <h6 className="fw-semibold">Exceptions</h6>
              <p className="mb-1 small">Late Coming: <strong>250</strong></p>
              <p className="mb-0 small">Early Going: <strong>500</strong></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Requests */}
      <Row className="mt-3">
        <Col md={6} className="mb-3">
          <Card className="shadow-sm text-center border-0 rounded-4">
            <Card.Body>
              <Link to="/leave-overtime-request">
                <FaUserEdit size={24} className="text-primary mb-2" />
              </Link>
              <h5>250</h5>
              <p className="small text-muted">OverTime Requests</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm text-center border-0 rounded-4" style={{ backgroundColor: "#CD5656",color:"white"}}>
            <Card.Body>
              <Link to="/leave-overtime-request">
                <FaUserAltSlash size={24} className="text-danger mb-2" />
              </Link>
              <h5>500</h5>
              <p className="small" style={{color:"white"}}>Leave Requests</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}
