const objSuccess =
{
    AssignmentID: "asdf123",
    Description: "We are currently in cmpe133.",
    Points: "10",
    QuestionType: "truefalse",
    Answer: "true",
    QuestionID: "021240a79466c7e6f91ac688317e055147b944e7\\"
}

const objUpdate =
{
    AssignmentID: "asdf123",
    Description: "We are currently not in cmpe133.",
    Points: "5",
    QuestionType: "truefalse",
    Answer: "false",
    QuestionID: "021240a79466c7e6f91ac688317e055147b944e7\\"
}

const objfail =
{
    AssignmentID: null,
    Description: "We are currently in cmpe133.",
    Points: "100",
    QuestionType: "truefalse",
    Answer: "true",
    QuestionID: null
}

const delQuestion =
{
    AssignmentID: "asdf123",
    QuestionID: "021240a79466c7e6f91ac688317e055147b944e7\\"
}

const delQuestionFail = {
    AssignmentID: "asdf123",
    QuestionID: null
}
module.exports = {objSuccess, objUpdate, objfail, delQuestion, delQuestionFail}