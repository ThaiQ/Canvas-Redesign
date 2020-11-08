var statusCode = {
    Success: 200,
    BadRequest: 400,
    Unauthorize: 401,
    NotFound: 404
}

function reponse(statusCode, body, callback){
    let obj = {
        statusCode: statusCode,
        body
    }
    if (callback && process.env.NODE_ENV != 'test') callback(null, obj)
    return obj
}

function input(TableName, Item){
    return {
        TableName,
        Item,
    }
}

module.exports = {statusCode, reponse, input}