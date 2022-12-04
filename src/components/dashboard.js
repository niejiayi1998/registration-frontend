import Message from "./message";
import AdminSidebar from "./admin/adminSidebar";

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
                </aside>
                <section className="col col-md-9">
                    <h3>Welcome {adminLoginStatus && 'Admin'}{advisorLoginStatus && 'Advisor'}{studentLoginStatus && 'Student'}</h3>
                    {studentLoginStatus && <Message />}
                </section>
            </div>
        </div>
    )
}

export default Dashboard;