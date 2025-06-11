import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ListGroup,
} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHolidayCalendar() {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editHoliday, setEditHoliday] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [shifts, setShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSaveShift = () => {
    if (!shiftName || !startTime || !endTime) return;

    const newShift = { name: shiftName, from: startTime, to: endTime };

    if (editIndex !== null) {
      const updated = [...shifts];
      updated[editIndex] = newShift;
      setShifts(updated);
    } else {
      setShifts([...shifts, newShift]);
    }

    resetModal();
  };

  const handleEdit = (index) => {
    const shift = shifts[index];
    setShiftName(shift.name);
    setStartTime(shift.from);
    setEndTime(shift.to);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteShift = (index) => {
    const updated = shifts.filter((_, i) => i !== index);
    setShifts(updated);
  };

  const resetModal = () => {
    setShiftName('');
    setStartTime('');
    setEndTime('');
    setEditIndex(null);
    setShowModal(false);
  };

  const markWeekends = () => {
    const year = new Date().getFullYear();
    const weekendHolidays = [];

    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const d = new Date(year, month, day);
        if (d.getMonth() !== month) continue;
        const dayOfWeek = d.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          const title = dayOfWeek === 0 ? 'Sunday' : 'Saturday';
          if (!holidays.some(h => sameDay(h.date, d))) {
            weekendHolidays.push({ date: d, title });
          }
        }
      }
    }

    setHolidays(prev => [...prev, ...weekendHolidays]);
  };

  const onDayClick = (day) => {
    const found = holidays.find(h => sameDay(h.date, day));
    setEditHoliday(found ? { ...found } : { date: day, title: '' });
    setTitleInput(found ? found.title : '');
    setModalShow(true);
  };

  const handleSave = () => {
    setHolidays(h => {
      const others = h.filter(hd => !sameDay(hd.date, editHoliday.date));
      if (titleInput.trim()) others.push({ date: editHoliday.date, title: titleInput });
      return others;
    });
    setModalShow(false);
  };

  const handleDelete = () => {
    setHolidays(h => h.filter(hd => !sameDay(hd.date, editHoliday.date)));
    setModalShow(false);
  };

  const tileContent = ({ date: d, view }) =>
    view === 'month' && holidays.some(h => sameDay(h.date, d))
      ? <div className="holiday-dot bg-danger rounded-circle mx-auto" style={{ width: 6, height: 6 }}></div>
      : null;

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <main className="flex-grow-1">
        <Container fluid className="p-3">
          <Row className="mb-4">
            <Col lg={3}>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <strong>Calendar</strong>
                  <Button size="sm" variant="outline-primary" onClick={markWeekends}>
                    📅 Mark Sat & Sun
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Calendar
                    onClickDay={onDayClick}
                    value={date}
                    onChange={setDate}
                    tileContent={tileContent}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className="mt-3 mt-lg-0 shadow-sm" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <Card.Header className="fw-bold text-center">Holiday List</Card.Header>
                <ListGroup variant="flush">
                  {holidays
                    .filter(h => h.title !== 'Saturday' && h.title !== 'Sunday')
                    .sort((a, b) => a.date - b.date)
                    .map((h, i) => (
                      <ListGroup.Item key={i} style={{ color: "red" }}>
                        {h.date.toDateString()}: {h.title}
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="float-end"
                          onClick={() => {
                            setEditHoliday(h);
                            setTitleInput(h.title);
                            setModalShow(true);
                          }}
                        >
                          ✏️
                        </Button>
                      </ListGroup.Item>
                    ))}
                  {holidays.filter(h => h.title !== 'Saturday' && h.title !== 'Sunday').length === 0 && (
                    <ListGroup.Item>No holidays added</ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className="shadow-sm h-100 d-flex flex-column">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <strong>Company Shifts</strong>
                  <Button size="sm" variant="outline-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Shift
                  </Button>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto', maxHeight: '65vh' }}>
                  <ListGroup variant="flush">
                    {shifts.map((shift, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{shift.name}</strong><br />
                          <small>{shift.from} - {shift.to}</small>
                        </div>
                        <div className="d-flex gap-2">
                          <Button variant="outline-warning" size="sm" onClick={() => handleEdit(index)}>✏️</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteShift(index)}>❌</Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                    {shifts.length === 0 && (
                      <ListGroup.Item className="text-muted text-center">No shifts added</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} style={{marginTop:"100px"}}>
              <Card className="shadow-sm" style={{backgroundColor:"transparent",width:"350px",height:"350px",padding:"20px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img src="/vite.svg" alt="" style={{height:"220px"}}/>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="bg-light text-dark py-4 shadow-sm border-top">
        <Container>
          <Row className="text-center text-md-start">
            <Col md={12}>
              <h5 className="fw-bold">📋 Leave Policy</h5>
              <ul className="list-unstyled small">
                <li>• Employees are entitled to 12 paid leaves per year.</li>
                <li>• Leave requests should be submitted at least 2 days in advance.</li>
                <li>• Medical leaves require a valid doctor's note.</li>
                <li>• Unused leaves will not be carried over to the next year.</li>
                <li>• Emergency leaves can be requested via email to the reporting manager.</li>
                <li>• Repeated unapproved leaves may result in disciplinary action.</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-3 small text-muted">
              &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Shift Modal */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Shift' : 'Add Shift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Shift Name</Form.Label>
              <Form.Control type="text" placeholder="e.g. Morning Shift" value={shiftName} onChange={(e) => setShiftName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>From</Form.Label>
              <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>To</Form.Label>
              <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveShift}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Holiday Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        {editHoliday && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {editHoliday?.title ? 'Edit' : 'Add'} Holiday - {editHoliday?.date.toDateString()}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Holiday title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {editHoliday.title && !['Saturday', 'Sunday'].includes(editHoliday.title) && (
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              )}
              <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }
}