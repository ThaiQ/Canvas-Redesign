const objSuccess =
{
    FilePath: "/user/documents/submission.txt",
    Answers: ["A", "B", "A", "C", "D"],
    Grade: null,
    AssignmentID: "asdf1234",
    StudentID: "000000001",
    SubmissionID: "1234asdf",
}

const objUpdate =
{
    FilePath: "/user/documents/submission2.txt",
    Answers: ["C", "D", "A", "B", "A"],
    Grade: null,
    AssignmentID: "asdf1234",
    StudentID: "000000001",
    SubmissionID: "a1s2d3f4",
}

const objfail =
{
    FilePath: null,
    Answers: null,
    Grade: null,
    AssignmentID: "asdf1234",
    StudentID: "000000001",
    SubmissionID: "1234asdf",
}

module.exports = {objSuccess, objUpdate, objfail}