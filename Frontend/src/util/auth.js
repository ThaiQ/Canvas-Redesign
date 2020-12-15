let clientId = "629278947250-nkpd44atk3oke72rnn4sv87hd8f5uckr.apps.googleusercontent.com"

function checkLogin (user) {
    if (user) return true
    else window.location.href = '/'
}

function checkTeacher (user) {
    if (user.AccessLevel === "Teacher") return true
    else window.location.href = '/'
}

module.exports = {checkLogin,clientId,checkTeacher} 