import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const translations = {
  en: {
    title: 'Admin Setting',
    editProfile: 'Edit Profile',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    uploadPhoto: 'Upload Photo',
    appearance: 'Appearance Settings',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    notification: 'Notification Preferences',
    emailNotif: 'Email Notifications',
    smsNotif: 'SMS Notifications',
    save: 'Save Settings',
    reset: 'Reset to Defaults',
    department: 'Department',
    designation: 'Designation',
    leaveDetails: 'Leave Details',
    cl: 'Casual Leave (CL)',
    pl: 'Privilege Leave (PL)',
    sl: 'Sick Leave (SL)',
    addNew: '➕ Add new...',
    manageLeave: 'Manage Leave Details',
    edit: 'Edit',
    submit: 'Submit',
    cancel: 'Cancel',
  },
};

export default function AdminSetting() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notificationPrefs, setNotificationPrefs] = useState({ email: true, sms: false });
  const [departments, setDepartments] = useState(['HR', 'Engineering', 'Finance']);
  const [designations, setDesignations] = useState(['Manager', 'Developer', 'Analyst']);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newEntry, setNewEntry] = useState('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveEditable, setLeaveEditable] = useState(true);
  const [isEditable, setIsEditable] = useState(true);

  const [profile, setProfile] = useState({
    name: 'Raju Dash',
    email: 'abc@gmail.com',
    password: '',
    phone: '9876543210',
    picture: '',
    department: 'HR',
    designation: 'Manager',
    leave: { cl: '', pl: '', sl: '' },
  });

  const t = translations[language];

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-white' : '';
  }, [theme]);

  const handleProfileChange = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));
  const handleLeaveChange = (type, value) => setProfile((prev) => ({ ...prev, leave: { ...prev.leave, [type]: value } }));
  const handleNotificationChange = (type) => setNotificationPrefs((prev) => ({ ...prev, [type]: !prev[type] }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile((prev) => ({ ...prev, picture: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => alert('Settings saved successfully!');

  const openModal = (type) => {
    setModalType(type);
    setNewEntry('');
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (modalType === 'department') {
      setDepartments([...departments, newEntry]);
      setProfile((prev) => ({ ...prev, department: newEntry }));
    } else if (modalType === 'designation') {
      setDesignations([...designations, newEntry]);
      setProfile((prev) => ({ ...prev, designation: newEntry }));
    }
    setShowModal(false);
  };

  const handleLeaveModalSubmit = () => {
    setLeaveEditable(false);
    setShowLeaveModal(false);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">{t.title}</h3>
      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>{t.editProfile}</Card.Title>
              {["name", "email", "password", "phone"].map((field, i) => (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>{t[field]}</Form.Label>
                  <Form.Control
                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                    value={profile[field]}
                    disabled={!isEditable}
                    onChange={(e) => handleProfileChange(field, e.target.value)}
                  />
                </Form.Group>
              ))}
              {["department", "designation"].map((field, i) => (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>{t[field]}</Form.Label>
                  <Form.Select
                    value={profile[field]}
                    disabled={!isEditable}
                    onChange={(e) =>
                      e.target.value === 'add_new' ? openModal(field) : handleProfileChange(field, e.target.value)
                    }
                  >
                    {(field === 'department' ? departments : designations).map((val, idx) => (
                      <option key={idx} value={val}>{val}</option>
                    ))}
                    <option value="add_new">{t.addNew}</option>
                  </Form.Select>
                </Form.Group>
              ))}
              <Form.Group>
                <Form.Label>{t.uploadPhoto}</Form.Label>
                <Form.Control type="file" onChange={handlePhotoUpload} disabled={!isEditable} />
                {profile.picture && (
                  <Image src={profile.picture} roundedCircle className="mt-3" width={80} height={80} />
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>{t.appearance}</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>{t.theme}</Form.Label>
                <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)} disabled={!isEditable}>
                  <option value="light">{t.light}</option>
                  <option value="dark">{t.dark}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.language}</Form.Label>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={!isEditable}>
                  <option value="en">English</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>{t.notification}</Card.Title>
              <Form.Check
                type="switch"
                label={t.emailNotif}
                checked={notificationPrefs.email}
                disabled={!isEditable}
                onChange={() => handleNotificationChange('email')}
              />
              <Form.Check
                type="switch"
                label={t.smsNotif}
                checked={notificationPrefs.sms}
                disabled={!isEditable}
                onChange={() => handleNotificationChange('sms')}
              />
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{t.leaveDetails}</Card.Title>
                <div>
                  Casual Leave: {profile.leave.cl || 0}, Personal Leave: {profile.leave.pl || 0}, Sick Leave: {profile.leave.sl || 0}
                </div>
              </div>
              <Button variant="outline-primary" onClick={() => setShowLeaveModal(true)}>
                {leaveEditable ? t.submit : t.edit}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12}>
          <Card className="shadow-sm mt-3">
            <Card.Body className="text-end">
              {isEditable ? (
                <>
                  <Button variant="danger" className="me-2" onClick={() => window.location.reload()}>
                    {t.reset}
                  </Button>
                  <Button variant="primary" onClick={() => { setIsEditable(false); saveSettings(); }}>
                    {t.submit}
                  </Button>
                </>
              ) : (
                <Button variant="warning" onClick={() => setIsEditable(true)}>
                  {t.edit}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New {modalType === 'department' ? t.department : t.designation}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newEntry}
            placeholder={`Enter new ${modalType}`}
            onChange={(e) => setNewEntry(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t.cancel}
          </Button>
          <Button variant="primary" onClick={handleModalSubmit} disabled={!newEntry.trim()}>
            {t.submit}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.leaveDetails}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["cl", "pl", "sl"].map((type, i) => (
            <Form.Group className="mb-2" key={i}>
              <Form.Label>{t[type]}</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={profile.leave[type]}
                disabled={!leaveEditable}
                onChange={(e) => handleLeaveChange(type, e.target.value)}
              />
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLeaveModal(false)}>
            {t.cancel}
          </Button>
          {leaveEditable ? (
            <Button variant="primary" onClick={handleLeaveModalSubmit}>
              {t.submit}
            </Button>
          ) : (
            <Button variant="warning" onClick={() => setLeaveEditable(true)}>
              {t.edit}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}