const axios = require("axios")

const body2 = {
    CourseName : "CMPE 133",
    Description : "REading test",
    Syllabus : "adding sylabus",
    Session: 1,
    InstructorID: 1232332
}

const body = {
    CourseName: "CMPE-133",
    Description: "Welcome to CMPE133",
    Syllabus:" ",
    Session: 1,
    CourseID: "courseid",
    InstructorID: 2343243
}

axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", body)
.then(
    (res)=>{
        console.log(res)
    }
)
.catch(err => console.log(err.message))