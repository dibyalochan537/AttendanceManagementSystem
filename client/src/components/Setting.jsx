import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './SettingsPage.css';

const translations = {
  en: {
    title: 'Employee Settings',
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
  },
  // Add more languages as needed
};

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
  });
  const [profile, setProfile] = useState({
    name: 'Raju Dash',
    email: 'abc@gmail.com',
    password: '',
    phone: '9876543210',
    picture: '',
  });

  const t = translations[language];

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-white' : '';
  }, [theme]);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
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

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">{t.title}</h3>
      <Row className="g-4">
        <Col md={6}>
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

        <Col md={6}>
          <Card className="shadow-sm">
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
                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mt-3">
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
        </Col>

        <Col md={12}>
          <Card className="shadow-sm">
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
    </Container>
  );
}
