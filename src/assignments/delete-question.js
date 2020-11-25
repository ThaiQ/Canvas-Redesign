const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();
const {statusCode, inputFormat, reponseFormat, errFormat} = require('../util')
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.deleteQuestionHandler = async (event, context, callback) => {
    const { body, httpMethod, path } = event;
    // Get id and name from the body of the request
    const {
        AssignmentID,
        QuestionID
        } = typeof body === 'string' ? JSON.parse(body) : body;
    

    //Checking for errors
    if (httpMethod !== 'POST') {
        return errFormat(statusCode.MethodNotAllow,`postMethod only accepts POST method, you tried: ${httpMethod} method.`,callback)
    }
    if (!AssignmentID) {
        return errFormat(statusCode.BadRequest,`Missing AssignmentID.`,callback)
    }
    if (!QuestionID) {
        return errFormat(statusCode.BadRequest,`Missing QuestionID.`,callback)
    }
    //combine them into an object
    let req = null
    // Delete an item in db
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
    req = inputFormat(tableName,null,{AssignmentID})
    req = await db.get(req).promise()
    var state = -1
    for (var i = 0; i < req.Questions.length; i++) {
        if (req.Questions[i].QuestionID === QuestionID) {
            if (i == req.Questions.length - 1) {
                req.Questions.pop()
                state = 0
            }
            else if (i == 0) {
                req.Questions.shift()
                state = 0
            }
            else {
                const arr1 = req.Questions.splice(0, i)
                const arr2 = req.Questions.splice(i + 1, req.Questions.length)
                req.Questions = arr1.concat(arr2)
                state = 0
            }
        }
    }
    return await db.put(inputFormat(tableName,req)).promise().then(
        res => {
            return reponseFormat(statusCode.Success, state, callback)
        }
    )
    .catch(
        err => {
            return reponseFormat(err.statusCode, err, callback)
        }
    )

};
