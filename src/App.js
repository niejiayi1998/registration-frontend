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
              <Route path="/admin-register" element={<AdvisorRegister />} />
              {/* All user logout */}
              <Route path="/logout" element={<Logout />} />

              <Route path="/course/:course_id" element={<CourseDetail />} />
          </Routes>
      </div>

  );
}

export default App;
