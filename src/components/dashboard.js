import AdminSidebar from "./admin/adminSidebar";
import StudentMessage from "./studentMessage";
import studentSideBar from "./student/studentSideBar";
import StudentSidebar from "./student/studentSideBar";

const Dashboard = () => {
    const adminLoginStatus = localStorage.getItem("adminLoginStatus");
    // const adminId = localStorage.getItem("adminId");
    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    // const advisorId = localStorage.getItem("advisorId");
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    // const studentId = localStorage.getItem("studentId");

    return (
        <div className="container">
            <div className="row mt-4">
                <aside className="col-md-3">
                    {adminLoginStatus && <AdminSidebar />}
                    {studentLoginStatus && <StudentSidebar />}
                </aside>
                <section className="col col-md-9">
                    <h3>Welcome To {adminLoginStatus && 'Admin'}{advisorLoginStatus && 'Advisor'}{studentLoginStatus && 'Student'} Dashboard !</h3>
                    <hr className="border border-3 border-danger" />
                    {studentLoginStatus && <StudentMessage />}
                </section>
            </div>
        </div>
    )
}

export default Dashboard;