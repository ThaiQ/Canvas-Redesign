const axios = require("axios")

const body = {
    CourseName : "CMPE 133",
    Description : "REading test",
    Syllabus : "adding sylabus",
    Session: 1,
    InstructorID: 1232332
}

axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", body)
.then(
    (res)=>{
        console.log(res)
    }
)
.catch(err => console.log(err.message))