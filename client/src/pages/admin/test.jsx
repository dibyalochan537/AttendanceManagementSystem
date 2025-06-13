

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
  hi: {
    title: 'कर्मचारी सेटिंग्स',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    name: 'नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    phone: 'फोन नंबर',
    uploadPhoto: 'फोटो अपलोड करें',
    appearance: 'रूप सेटिंग्स',
    theme: 'थीम',
    light: 'लाइट',
    dark: 'डार्क',
    language: 'भाषा',
    notification: 'सूचना प्राथमिकताएँ',
    emailNotif: 'ईमेल सूचनाएं',
    smsNotif: 'एसएमएस सूचनाएं',
    save: 'सेटिंग्स सहेजें',
    reset: 'डिफ़ॉल्ट पर रीसेट करें',
    department: 'विभाग',
    designation: 'पद',
    leaveDetails: 'छुट्टी का विवरण',
    cl: 'कैज़ुअल लीव (CL)',
    pl: 'प्रिविलेज लीव (PL)',
    sl: 'सिक लीव (SL)',
    addNew: '➕ नया जोड़ें...',
    manageLeave: 'छुट्टी का प्रबंधन करें',
    edit: 'संपादित करें',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
  },
};

export default function AdminSetting() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
  });

  const [departments, setDepartments] = useState(['HR', 'Engineering', 'Finance']);
  const [designations, setDesignations] = useState(['Manager', 'Developer', 'Analyst']);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newEntry, setNewEntry] = useState('');

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveEditable, setLeaveEditable] = useState(true);

  const [profile, setProfile] = useState({
    name: 'Raju Dash',
    email: 'abc@gmail.com',
    password: '',
    phone: '9876543210',
    picture: '',
    department: 'HR',
    designation: 'Manager',
    leave: {
      cl: '',
      pl: '',
      sl: '',
    },
  });

  const t = translations[language];

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-white' : '';
  }, [theme]);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeaveChange = (type, value) => {
    setProfile((prev) => ({
      ...prev,
      leave: {
        ...prev.leave,
        [type]: value,
      },
    }));
  };

  const handleNotificationChange = (type) => {
    setNotificationPrefs((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

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
              <Form.Group className="mb-3">
                <Form.Label>{t.name}</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.email}</Form.Label>
                <Form.Control
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.password}</Form.Label>
                <Form.Control
                  type="password"
                  value={profile.password}
                  onChange={(e) => handleProfileChange('password', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.phone}</Form.Label>
                <Form.Control
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.department}</Form.Label>
                <Form.Select
                  value={profile.department}
                  onChange={(e) =>
                    e.target.value === 'add_new'
                      ? openModal('department')
                      : handleProfileChange('department', e.target.value)
                  }
                >
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                  <option value="add_new">{t.addNew}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.designation}</Form.Label>
                <Form.Select
                  value={profile.designation}
                  onChange={(e) =>
                    e.target.value === 'add_new'
                      ? openModal('designation')
                      : handleProfileChange('designation', e.target.value)
                  }
                >
                  {designations.map((des, index) => (
                    <option key={index} value={des}>
                      {des}
                    </option>
                  ))}
                  <option value="add_new">{t.addNew}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>{t.uploadPhoto}</Form.Label>
                <Form.Control type="file" onChange={handlePhotoUpload} />
                {profile.picture && (
                  <Image
                    src={profile.picture}
                    roundedCircle
                    className="mt-3"
                    width={80}
                    height={80}
                  />
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
                <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="light">{t.light}</option>
                  <option value="dark">{t.dark}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t.language}</Form.Label>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
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
                onChange={() => handleNotificationChange('email')}
              />
              <Form.Check
                type="switch"
                label={t.smsNotif}
                checked={notificationPrefs.sms}
                onChange={() => handleNotificationChange('sms')}
              />
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{t.leaveDetails}</Card.Title>
                <div>
                  Casual Leave: {profile.leave.cl || 0}, Personal Leave: {profile.leave.pl || 0}, Sisck Leave: {profile.leave.sl || 0}
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
              <Button variant="danger" className="me-2" onClick={() => window.location.reload()}>
                {t.reset}
              </Button>
              <Button variant="primary" onClick={saveSettings}>
                {t.save}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Department/Designation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add New {modalType === 'department' ? t.department : t.designation}
          </Modal.Title>
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

      {/* Modal for Leave Details */}
      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.leaveDetails}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>{t.cl}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={profile.leave.cl}
              disabled={!leaveEditable}
              onChange={(e) => handleLeaveChange('cl', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>{t.pl}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={profile.leave.pl}
              disabled={!leaveEditable}
              onChange={(e) => handleLeaveChange('pl', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t.sl}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={profile.leave.sl}
              disabled={!leaveEditable}
              onChange={(e) => handleLeaveChange('sl', e.target.value)}
            />
          </Form.Group>
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
