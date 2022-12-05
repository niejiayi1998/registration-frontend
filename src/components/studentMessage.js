import axios from "axios";
import {useEffect, useState} from "react";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const StudentMessage = () => {
    const studentId = localStorage.getItem("studentId");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/message-to-student/${studentId}`)
                .then((res) =>
                    setMessages(res.data)
                )
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div>
            {messages && messages.map(m =>
                <div className="card mb-2" key={m.id}>
                    <div className="card-body">
                        <h5 className="card-title">From {m.advisor_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{m.send_time.substring(0, 10)} {m.send_time.substring(11, 16)}</h6>
                        <p className="card-text">{m.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentMessage;