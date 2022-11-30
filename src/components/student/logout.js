const Logout = () => {
    localStorage.removeItem("studentLoginStatus");
    localStorage.removeItem("studentId");
    localStorage.removeItem("advisorLoginStatus");
    localStorage.removeItem("advisorId");
    localStorage.removeItem("adminLoginStatus");
    localStorage.removeItem("adminId");
    window.location.href = "/";
}

export default Logout;