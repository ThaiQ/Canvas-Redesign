const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();
const {reponse, input, statusCode} = require('../util')
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putUserHandler = (event, context, callback) => {
    const { body, httpMethod, path } = event;
    let response;

    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }

    // Get id and name from the body of the request
    const {Bio,
    DateBirth,
    AccountEmail,
    ContactInformation,
    AccessLevel,
    ProfilePictureURL,
    StudentID} = JSON.parse(body);

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    // const params = {
    //     TableName: tableName,
    //     Item: {Bio,
    //         DateBirth,
    //         AccountEmail,
    //         ContactInformation,
    //         AccessLevel,
    //         ProfilePictureURL,
    //         StudentID},
    // };

    const params = input(tableName, {Bio,
        DateBirth,
        AccountEmail,
        ContactInformation,
        AccessLevel,
        ProfilePictureURL,
        StudentID})

    db.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    reponse(statusCode.BadRequest, body);
    reponse(statusCode.NotFound, body, callback);

    //process.env.NODE_ENV != 'test' && callback(null, response)
    return reponse(statusCode.Success, body, callback);
};
