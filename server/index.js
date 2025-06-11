const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const router = express.Router();
const jwt = require('jsonwebtoken');  // For CommonJS
const SECRET_KEY = 'your-secret-key';
// const verifyToken = require('./middleware/authMiddleware');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/dashboard', require('./routes/dashboard'));

// Test route
const dummyAdmin={
  id:"ADMIN_1001",
  username:"admin@desktop",
  password:"admin@123",
  name:"ADMIN_ADMIN",
}
const dummyHrs=[
  {id:"HR_1001",username:"hr@1",password:"hr@123",name:"Hr 1",employees:["EMP_1001","EMP_1013","EMP_1003","EMP_1008"]},
  {id:"HR_1002",username:"hr@2",password:"hr@123",name:"Hr 2",employees:["EMP_1010","EMP_1002","EMP_1009","EMP_1007"]},
  {id:"HR_1003",username:"hr@3",password:"hr@123",name:"Hr 3",employees:["EMP_1011","EMP_1012","EMP_1004","EMP_1016"]},
  {id:"HR_1004",username:"hr@4",password:"hr@123",name:"Hr 4",employees:["EMP_1006","EMP_1015","EMP_1014","EMP_1005"]},
];
const dummyEmployee=[
  {id:"EMP_1001",username:"emp@1",password:"emp@123",name:"Employee 1",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1001",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1002",username:"emp@2",password:"emp@123",name:"Employee 2",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1002",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1003",username:"emp@3",password:"emp@123",name:"Employee 3",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1001",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1004",username:"emp@4",password:"emp@123",name:"Employee 4",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1003",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1005",username:"emp@5",password:"emp@123",name:"Employee 5",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1004",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1006",username:"emp@6",password:"emp@123",name:"Employee 6",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1004",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1007",username:"emp@7",password:"emp@123",name:"Employee 7",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1002",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1008",username:"emp@8",password:"emp@123",name:"Employee 8",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1001",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1009",username:"emp@9",password:"emp@123",name:"Employee 9",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1002",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1010",username:"emp10",password:"emp@123",name:"Employee 10",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1002",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1011",username:"emp11",password:"emp@123",name:"Employee 11",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1003",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1012",username:"emp12",password:"emp@123",name:"Employee 12",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1003",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1013",username:"emp13",password:"emp@123",name:"Employee 13",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1001",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1014",username:"emp14",password:"emp@123",name:"Employee 14",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1004",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1015",username:"emp15",password:"emp@123",name:"Employee 15",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1004",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
  {id:"EMP_1016",username:"emp16",password:"emp@123",name:"Employee 16",deptId:"",designation:"",profileImage:"",totalLeave:"12",leaveAvail:"0",hrId:"HR_1003",attendance:[{date:"",inTime:"",outTime:"",status:""}]},
];

app.post("/login", (req, res) => {
  let {username,password,selectDepartment}=req.body;
  if(selectDepartment=="admin"){
    if(dummyAdmin.username==username){
      // const token = jwt.sign({ email: dummyAdmin.username, name:dummyAdmin.name}, SECRET_KEY, { expiresIn: '1h' });
      // res.json({ message: 'Login successful', token,dummyAdmin});
      res.redirect("https://attendance-management-system-sigma.vercel.app/admin/home");
    }
  }
  else if(selectDepartment=="employee"){
    res.redirect("https://attendance-management-system-sigma.vercel.app/emp/home");
  }
  else{
    // const hrData=dummyHrs.find(d=>d.username==username);
    // const empData=dummyEmployee.filter(d=>d.hrId==hrData.id);
    // const token = jwt.sign({ hrid:hrData.id, hrusername: hrData.username}, SECRET_KEY, { expiresIn: '1h' });
    // res.json({ message: 'Login successful', token, hrData,empData });
    res.redirect("https://attendance-management-system-sigma.vercel.app/hr/home");
  }
  // res.send({username,password,selectDepartment});
});
app.post("/signup", (req, res) => {
  res.redirect("https://attendance-management-system-sigma.vercel.app/")
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
