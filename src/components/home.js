import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course`)
                .then((res) => {
                    setCourses(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return(
        <div className="container mt-4">
            <h3 className="mb-4">Courses</h3>
            <ul className="list-group">
                {courses && courses.map((c, index) =>
                    <Link to={`/course/${c.id}`} key={index} className="list-group-item">{c.name}</Link>
                )}
            </ul>

        </div>
    )
}

export default Home;