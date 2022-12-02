import './App.css';
import Navbar from "./components/boilerplates/navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home";
import CourseDetail from "./components/courseDetail/courseDetail";
import StudentLogin from "./components/student/studentLogin";
import StudentRegister from "./components/student/studentRegister";
import AdvisorLogin from "./components/advisor/advisorLogin";
import AdvisorRegister from "./components/advisor/advisorRegister";
import AdminLogin from "./components/admin/adminLogin";
import Logout from "./components/student/logout";
import AddCourse from "./components/addCourse";
import Dashboard from "./components/dashboard";
import AdminRegister from "./components/admin/adminRegister";
import Ticket from "./components/ticket";
import Message from "./components/message";
import AddSection from "./components/addSection";
import EditSection from "./components/editSection";
import EditCourse from "./components/editCourse";
import Profile from "./components/profile";
import MyCourse from "./components/myCourse";

function App() {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>} />

              {/* Student */}
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/student-register" element={<StudentRegister />} />
              {/* Advisor */}
              <Route path="/advisor-login" element={<AdvisorLogin />} />
              <Route path="/advisor-register" element={<AdvisorRegister />} />
              {/* Admin */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              {/* All user logout */}
              <Route path="/logout" element={<Logout />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-profile" element={<Profile />}/>
              <Route path="/course/:course_id" element={<CourseDetail />} />

              {/* Admin dashboard route */}
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/edit-course/:course_id" element={<EditCourse />} />
              <Route path="/add-section/:course_id" element={<AddSection />} />
              <Route path="/edit-section/:section_id" element={<EditSection />} />

              {/* Advisor dashboard route */}
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/message" element={<Message />} />

              {/* Student dashboard route */}
              <Route path="/my-courses" element={<MyCourse />} />

          </Routes>
      </div>

  );
}

export default App;
