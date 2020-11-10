const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();
const {reponse, input, statusCode, errMessage} = require('../util')
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putUserHandler = (event, context, callback) => {
    const { body, httpMethod, path } = event;

    //Checking for errors
    if (httpMethod !== 'POST') {
        const err = errMessage(`postMethod only accepts POST method, you tried: ${httpMethod} method.`)
        return reponse(statusCode.MethodNotAllow, err, callback);
    }
    else if (!body.AccountEmail) {
        const err = errMessage(`Missing AccountEmail.`)
        return reponse(statusCode.BadRequest, err, callback);
    }

    // Get id and name from the body of the request
    const {Bio,
    DateBirth,
    AccountEmail,
    ContactInformation,
    AccessLevel,
    ProfilePictureURL,
    StudentID} = body;
    
    const req = {Bio,
        DateBirth,
        AccountEmail,
        ContactInformation,
        AccessLevel,
        ProfilePictureURL,
        StudentID}
    
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    db.put(input(tableName,req), function(err, data) {
        if (err) {
            return reponse(err.statusCode, errMessage(err.message), callback);
        }
    });
    return reponse(statusCode.Success, req, callback);
};
