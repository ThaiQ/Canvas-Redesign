const objSuccess =
{
    Name: "Midterm 1",
    Description: "Test of knowledge",
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
    Name: "Midterm 1 Updated",
    Description: "Test of knowledge",
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
    Questions: [{
        AssignmentID: "asdf123",
        Description: "We are currently in cmpe133.",
        Points: "10",
        QuestionType: "truefalse",
        Answer: "true",
        QuestionID: "021240a79466c7e6f91ac688317e055147b944e7\\"
    }],
    AssignmentID: "asdf123",
    Submissions: [],
    Closed: "0"
}

const gradeTest =
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
        Grade: ".95",
        AssignmentID: "asdf123",
        StudentID: "00000001",
        SubmissionID: "1234asdf",
    }],
    Closed: "0"
}

module.exports = {objSuccess, objUpdate, objfail, submissionTest, questionTest, gradeTest}