const StudentLogout = () => {
    localStorage.removeItem("studentLoginStatus");
    localStorage.removeItem("studentId");
    window.location.href = "/";
}

export default StudentLogout;