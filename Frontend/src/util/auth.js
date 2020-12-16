let clientId = "629278947250-nkpd44atk3oke72rnn4sv87hd8f5uckr.apps.googleusercontent.com"

function checkLogin (user) {
    if (user) return true
    else window.location.href = '/'
}

function checkTeacher (user) {
    if (user.AccessLevel === "Teacher") return true
    else window.location.href = '/'
}

async function changeAccess (user) {
    const axios = require('axios')
    let body = {
        ...user,
        AccessLevel: user.AccessLevel=='Teacher'? 'Student' : 'Teacher'
    }
    await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/user", JSON.stringify(body))
    localStorage.setItem('user', JSON.stringify(body));
    window.location.reload(true)
}

module.exports = {checkLogin,clientId,checkTeacher,changeAccess} 