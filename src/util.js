var statusCode = {
    Success: 200,
    BadRequest: 400,
    Unauthorize: 401,
    NotFound: 404,
    MethodNotAllow: 405
}

/**
 * Add callback to parameter if you want web call back. Though, callback will not run in test environment
 * Funtion always return reponse obj = {statusCode, body}
 * @param {int} statusCode - http protocol code
 * @param {obj} body - json obj
 * @param {method} callback - web callback function
 */
function reponse(statusCode, body, callback){
    let obj = {
        statusCode: statusCode,
        body
    }
    if (callback && process.env.NODE_ENV != 'test') callback(null, obj)
    return obj
}

/**
 * Return formated input for db calls
 * @param {String} TableName 
 * @param {obj} Item 
 */
function input(TableName, Item){
    return {
        TableName,
        Item,
    }
}

/**
 * Return err obj
 * @param {String} message 
 */
function errMessage(message){
    let obj = {message}
    return obj
}

module.exports = {statusCode, reponse, input, errMessage}