import './App.css';
import Navbar from "./components/boilerplates/navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home";
import CourseDetail from "./components/courseDetail/courseDetail";
import StudentLogin from "./components/student/studentLogin";
import StudentLogout from "./components/student/studentLogout";
import StudentRegister from "./components/student/studentRegister";

function App() {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>} />

              {/*Student*/}
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/student-register" element={<StudentRegister />} />
              <Route path="/student-logout" element={<StudentLogout />} />

              <Route path="/course/:course_id" element={<CourseDetail />} />
          </Routes>
      </div>

  );
}

export default App;
