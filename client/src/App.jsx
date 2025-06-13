import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginSignUpPage from './pages/auth/LoginsignUp.jsx'
import AdminHomePage from './pages/admin/AdminHomePage.jsx'
import HrHomePage from './pages/hr/HrHomePage.jsx'
import EmpHomePage from './pages/employee/EmpHomePage.jsx'

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/' element={<LoginSignUpPage />}/>
        <Route path='/admin/home' element={<AdminHomePage/>}/>
        {/* <Route path='/admin/attendance' element={<AdminHomePage />}/>
        <Route path='/admin/leave' element={<AdminHomePage />}/>
        <Route path='/admin/time' element={<AdminHomePage />}/>
        <Route path='/admin/performance' element={<AdminHomePage />}/>
        <Route path='/leave-overtime-request' element={<LeaveOverTime />}/> */}

        {/* HRs */}
        <Route path='/hr/home' element={<HrHomePage />}/>


        {/* Employeee */}
        <Route path='/emp/home' element={<EmpHomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
