const crypto = require('crypto');

const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();
const {statusCode, inputFormat, reponseFormat, errFormat} = require('../util')
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putQuestionHandler = async (event, context, callback) => {
    const { body, httpMethod, path } = event;
    let response = null;
    // Get id and name from the body of the request
    const {
            AssignmentID,
            Description,
            Points,
            QuestionType,
            Answer,
            QuestionID
        } = typeof body === 'string' ? JSON.parse(body) : body;

    //Checking for errors
    if (httpMethod !== 'POST') {
        return errFormat(statusCode.MethodNotAllow,`postMethod only accepts POST method, you tried: ${httpMethod} method.`,callback)
    }
    else if (!AssignmentID) {
        return errFormat(statusCode.BadRequest,`Missing AssignmentID.`,callback)
    }
    else if (!Answer) {
        return errFormat(statusCode.BadRequest,`Missing Answer.`,callback)
    }
    else if (!QuestionType) {
        return errFormat(statusCode.BadRequest,`Missing Question Type.`,callback)
    }
    else if (!Description) {
        return errFormat(statusCode.BadRequest,`Missing Description.`,callback)
    }

    if (!response){
        //combine them into an object
        const question = 
        {
            AssignmentID,
            Description,
            Points,
            QuestionType,
            Answer,
            QuestionID : QuestionID ? QuestionID : crypto.createHash('sha1').update(AssignmentID + Description).digest('hex')
        }
        let req = null
        req = inputFormat(tableName, null, {AssignmentID})
        // Get 1 item from the table
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
        req = await db.get(req).promise()
        var state = 0
        var index = 0
        for (var i = 0; i < req.Questions.length; i++) {
            if (req.Questions[i].QuestionID === question.QuestionID) {
                req.Questions[i] = question
                state = 1
                index = i
            }
        }
        if (state == 0) {
            index = req.Questions.length
            req.Questions.push(question)
        }
        // TODO: Find the correct entry in Assignment Table and deposit the question within the questions array for that entry

        // Creates a new item, or replaces an old item with a new item
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
        return await db.put(inputFormat(tableName,req)).promise().then(
            res => {
                return reponseFormat(statusCode.Success, req.Questions[index], callback)
            }
        )
        .catch(
            err => {
                return reponseFormat(err.statusCode, err, callback)
            }
        )
    }
};
