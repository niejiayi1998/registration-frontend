import {useState} from "react";
import AdvisorCourseSections from "./advisorCourseSections";

const CourseDetail = () => {
    const [courseData, setCourseData] = useState();
    return (
        <div>
            This is course detail page
            <AdvisorCourseSections />
        </div>
    )
}

export default CourseDetail;