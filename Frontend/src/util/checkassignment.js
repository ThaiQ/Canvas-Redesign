function checkAssignment (Assignment) {
    if (Assignment.Category === "Assignment") return true
    else window.location.href = '/viewquiz/'.concat(Assignment.AssignmentID)
}

function checkQuiz (Assignment) {
    if (Assignment.Category === "Quiz" || Assignment.Category === "Test") return true
    else window.location.href = '/viewassignment/'.concat(Assignment.AssignmentID)
}

module.exports = {checkAssignment, checkQuiz} 