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
import MyCourse from "./components/myCourse";
import EditAdminProfile from "./components/admin/editAdminProfile";
import EditAdvisorProfile from "./components/advisor/editAdvisorProfile";
import EditStudentProfile from "./components/student/editStudentProfile";
import AllStudents from "./components/allStudents";
import StudentDetail from "./components/student/studentDetail";
import AdminAllCourses from "./components/adminAllCourses";

function App() {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>} />

              {/* Student */}
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/student-register" element={<StudentRegister />} />
              <Route path="/student-edit-profile" element={<EditStudentProfile />} />
              <Route path="/student/:student_id" element={<StudentDetail />} />
              {/* Advisor */}
              <Route path="/advisor-login" element={<AdvisorLogin />} />
              <Route path="/advisor-register" element={<AdvisorRegister />} />
              <Route path="/advisor-edit-profile" element={<EditAdvisorProfile />} />
              {/* Admin */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/admin-edit-profile" element={<EditAdminProfile />} />
              <Route path="/all-students" element={<AllStudents />} />

              {/* All user logout */}
              <Route path="/logout" element={<Logout />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/course/:course_id" element={<CourseDetail />} />

              {/* Admin dashboard route */}
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/edit-course/:course_id" element={<EditCourse />} />
              <Route path="/add-section" element={<AddSection />} />
              <Route path="/edit-section/:section_id" element={<EditSection />} />
              <Route path="/admin-all-courses" element={<AdminAllCourses />} />

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
