let objSuccess = {
    CourseID: 1234,
    Title: "Software Engr2",
    Contents: "No homework",
    HostID: 4234,
    Date: Date.now().toString(),
    ID: "courseid"
}

let objUpdate = {
    CourseID: 1234,
    Title: "Software Engr3",
    Contents: "Yes homework",
    HostID: 4234,
    Date: Date.now().toString(),
    ID: "courseid"
}

let objfail = {
    Title: "Software Engr3",
    Contents: "Yes homework",
    Date: Date.now().toString(),
}

module.exports = {objSuccess,objUpdate,objfail}