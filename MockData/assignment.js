const objSuccess =
{
    Description: "Midterm 1",
    Points: "100",
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: [],
    AssignmentID: "asdf123",
    Submissions: [],
    Closed: "0"
}

const objUpdate =
{
    Description: "Midterm 1 Updated",
    Points: "150",
    DueDate: "11/11/2020",
    Category: "Quiz",
    Questions: [],
    AssignmentID: "asdf123",
    Submissions: [],
    Closed: "1"
}

const objfail =
{
    Description: null,
    Points: null,
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: [],
    AssignmentID: null,
    Submissions: [],
    Closed: "0"
}

const submissionTest =
{
    Description: "Midterm 1",
    Points: "100",
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: [],
    AssignmentID: "asdf123",
    Submissions: [{
        FilePath: "/user/documents/submission.txt",
        Answers: ["A", "B", "A", "C", "D"],
        Grade: null,
        AssignmentID: "asdf1234",
        StudentID: "000000001",
        SubmissionID: "1234asdf",
    }],
    Closed: "0"
}

const questionTest =
{
    Description: "Midterm 1",
    Points: "100",
    DueDate: "11/10/2020",
    Category: "Quiz",
    Questions: [],
    AssignmentID: "asdf123",
    Submissions: [],
    Closed: "0"
}

module.exports = {objSuccess, objUpdate, objfail, submissionTest, questionTest}