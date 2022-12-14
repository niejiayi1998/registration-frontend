import {useEffect, useState} from "react";
import axios from "axios";
import AdvisorSidebar from "./advisor/advisorSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const Ticket = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/ticket/pending`)
                .then(res => setTickets(res.data))
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleApprove = (ticket) => {
        // change ticket status to approved
        const ticketFormData = new FormData();
        ticketFormData.append("student", ticket.student);
        ticketFormData.append("section", ticket.section);
        ticketFormData.append("request", ticket.request);
        ticketFormData.append("created_time", ticket.created_time);
        ticketFormData.append("status", 1);
        try {
            axios.put(`${baseUrl}/ticket/${ticket.id}/`, ticketFormData)
                .then(res => {
                    if (res.status === 200) {
                        // create history for student enroll in this section
                        const historyFormData = new FormData();
                        historyFormData.append("student", ticket.student);
                        historyFormData.append("section", ticket.section);
                        historyFormData.append("status", 2);

                        if (ticket.request === "ENROLL") {
                            // approve student enroll
                            try {
                                axios.post(`${baseUrl}/history/`, historyFormData)
                                    .then(res => {console.log("successfully create history")})
                            } catch (e) {
                                console.log(e);
                            }
                        } else if (ticket.request === "DROP") {
                            // approve student drop & delete history
                            try {
                                axios.get(`${baseUrl}/find-historyId/${ticket.student}/${ticket.section}`)
                                    .then((res) => {
                                        const historyId = res.data.historyId;
                                        try {
                                            axios.delete(`${baseUrl}/history/${historyId}/`)
                                                .then((res) => console.log("successfully delete hist"))
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    })
                            } catch (e) {
                                console.log(e);
                            }
                        }


                        const newTickets = tickets.filter(t => t !== ticket);
                        setTickets(newTickets);
                    }
                })
        } catch (e) {
            console.log(e);
        }


    }

    const handleDecline = (ticket) => {
        // change ticket status to declined
        const ticketFormData = new FormData();
        ticketFormData.append("student", ticket.student);
        ticketFormData.append("section", ticket.section);
        ticketFormData.append("request", ticket.request);
        ticketFormData.append("created_time", ticket.created_time);
        ticketFormData.append("status", 3);
        console.log(ticket)
        try {
            axios.put(`${baseUrl}/ticket/${ticket.id}/`, ticketFormData)
                .then(res => {
                    if (res.status === 200) {
                        const newTickets = tickets.filter(t => t !== ticket);
                        setTickets(newTickets);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdvisorSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Pending Tickets</h5>
                        <div className="card-body mb-3">
                            <table className="table text-center">
                                <thead>
                                <tr>
                                    <th>Student Id</th>
                                    <th>Student Name</th>
                                    <th>Action</th>
                                    <th>Course</th>
                                    <th>Section</th>
                                    <th>Decision</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    tickets.map(t =>
                                        <tr key={t.id}>
                                            <td>{t.student}</td>
                                            <td>{t.student_name}</td>
                                            <td>{t.request}</td>
                                            <td>{t.course_name}</td>
                                            <td>{t.section_name}</td>
                                            <td>
                                                <button onClick={() => handleApprove(t)} className="btn btn-success btn-sm me-2">Approve</button>
                                                <button onClick={() => handleDecline(t)} className="btn btn-danger btn-sm">Decline</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Ticket;