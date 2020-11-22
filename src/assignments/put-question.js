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
            Answer
        } = typeof body === 'string' ? JSON.parse(body) : body;

    //Checking for errors
    if (httpMethod !== 'POST') {
        return errFormat(statusCode.MethodNotAllow,`postMethod only accepts POST method, you tried: ${httpMethod} method.`,callback)
    }
    else if (!AssignmentID) {
        return errFormat(statusCode.BadRequest,`Missing AssignmentID.`,callback)
    }

    if (!response){
        //combine them into an object
        const req = 
        {
            AssignmentID,
            Description,
            Points,
            QuestionType,
            Answer
        }
        
        // TODO: Find the correct entry in Assignment Table and deposit the question within the questions array for that entry

        // Creates a new item, or replaces an old item with a new item
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
        return await db.put(inputFormat(tableName,req)).promise().then(
            res => {
                return reponseFormat(statusCode.Success, req, callback)
            }
        )
        .catch(
            err => {
                return reponseFormat(err.statusCode, err, callback)
            }
        )
    }
};
