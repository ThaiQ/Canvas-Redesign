const objSuccess =
{
    Description: "Midterm 1",
    Points: "100",
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3"],
    AssignmentID: "asdf123"
}

const objUpdate =
{
    Description: "Midterm 1 Updated",
    Points: "150",
    DueDate: "11/11/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    AssignmentID: "asdf123"
}

const objfail =
{
    Description: null,
    Points: null,
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: ["Q1", "Q2", "Q3"],
    AssignmentID: null
}

module.exports = {objSuccess, objUpdate, objfail}