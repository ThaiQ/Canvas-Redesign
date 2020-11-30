const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();
const {statusCode, inputFormat, reponseFormat, errFormat} = require('../util')
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.getCourseHandler = async (event, context, callback) => {
    const { body, httpMethod, path } = event;
    // Get id and name from the body of the request
    const {
        CourseID 
        } = typeof body === 'string' ? JSON.parse(body) : body;
    

    //Checking for errors
    if (httpMethod !== 'POST') {
        return errFormat(statusCode.MethodNotAllow,`postMethod only accepts POST method, you tried: ${httpMethod} method.`,callback)
    }

    //combine them into an object
    let req = null
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    if (CourseID) {
        req = inputFormat(tableName, null, {CourseID})
        // Get 1 item from the table
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
        return await db.get(req).promise()
        .then(
            res => {
                if (JSON.stringify(res) == JSON.stringify({})) return reponseFormat(statusCode.NotFound, res, callback)
                return reponseFormat(statusCode.Success, res, callback)
            }
        )
        .catch(
            err => {
                return reponseFormat(err.statusCode, err, callback)
            }
        )
    } else {
        req = inputFormat(tableName)
        // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
        // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
        return await db.scan(req).promise()
        .then(
            res => {
                return reponseFormat(statusCode.Success, res, callback)
            }
        )
        .catch(
            err => {
                return reponseFormat(err.statusCode, err, callback)
            }
        )
    }
};
