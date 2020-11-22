const objSuccess =
{
    Description: "Midterm 1",
    Points: "100",
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3"],
    AssignmentID: "asdf123",
    Closed: "0"
}

const objUpdate =
{
    Description: "Midterm 1 Updated",
    Points: "150",
    DueDate: "11/11/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    AssignmentID: "asdf123",
    Closed: "1"
}

const objfail =
{
    Description: null,
    Points: null,
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3"],
    AssignmentID: null,
    Closed: "0"
}

module.exports = {objSuccess, objUpdate, objfail}