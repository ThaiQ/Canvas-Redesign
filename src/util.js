const { CodeArtifact } = require("aws-sdk");

var statusCode = {
    Success: 200,
    BadRequest: 400,
    Unauthorize: 401,
    NotFound: 404,
    MethodNotAllow: 405
}

/**
 * Funtion always return reponse obj = {statusCode, body}
 * Add callback if you want web call back
 * @param {int} statusCode - http protocol code
 * @param {obj} body - json obj
 * @param {func} callback - web call back funtion
 */
function reponseFormat(statusCode, body, callback){
    let obj = null
    if (process.env.NODE_ENV === "test"){
        obj = {
            statusCode: statusCode,
            body: JSON.stringify(body),
        }
    }else {
        obj = {
            statusCode: statusCode,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
    }
    if (callback) process.env.NODE_ENV !== 'test' && callback(null, obj)
    return obj
}

/**
 * Return formated input for db calls. 
 * Leave item = null for db-put
 * Leave key = null for db-get and delete
 * Leave key = null and item = null for querying everything
 * @param {String} TableName 
 * @param {obj} Item 
 * @param {obj} Key - Search Key
 */
function inputFormat(TableName, Item, Key){
    let obj = null;
    if (Item) {
        obj = {TableName, Item}
    }
    else if (Key) {
        obj = {TableName, Key}
    }
    else {
        obj = {TableName}
    }
    return obj
}

/**
 * return error format
 * Add callback if you want web call back
 * @param {int} statusCode 
 * @param {Strong} message 
 * @param {func} callback - web call back funtion
 */
function errFormat(statusCode, message, callback){
    let obj = 
    {
        statusCode,
        message
    }
    reponseFormat(statusCode, obj, callback)
    return obj
}

module.exports = {statusCode, reponseFormat, inputFormat, errFormat}