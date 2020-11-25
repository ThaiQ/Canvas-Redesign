// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');
// Import all functions from put-item.js
const lambda = require('../../../src/discussion/get-discussion');

const { statusCode, reponseFormat } = require('../../../src/util')

// This includes all tests for putItemHandler
describe('Test getDiscussionHandler', () => {
    let getSpy;
    let scanSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB put method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
        scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
    });

    // Clean up mocks
    afterAll(() => {
        getSpy.mockRestore();
        scanSpy.mockRestore();
    });

    //Mock data
    const {objSuccess, objUpdate, objfail} = require('../../../MockData/discussion')

    it('should get 1 item', async () => {
        getSpy.mockReturnValue({
            promise: () => Promise.resolve(objSuccess),
        });

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(objSuccess),
        };

        // Invoke putItemHandler()
        const result = await lambda.getDiscussionHandler(event,"",()=>{});


        const expectedResult = reponseFormat(statusCode.Success, objSuccess)

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should get all item', async () => {
        scanSpy.mockReturnValue({
            promise: () => Promise.resolve({objSuccess, objUpdate}),
        });

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify({}),
        };

        // Invoke putItemHandler()
        const result = await lambda.getDiscussionHandler(event,"",()=>{});
        const expectedResult = reponseFormat(statusCode.Success, {objSuccess, objUpdate})

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should not find any item', async () => {
        getSpy.mockReturnValue({
            promise: () => Promise.resolve({}),
        });

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(objSuccess),
        };

        // Invoke putItemHandler()
        const result = await lambda.getDiscussionHandler(event,"",()=>{});
        const expectedResult = reponseFormat(statusCode.NotFound, {})

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });

    it('failed 405', async () => {

        const event = {
            httpMethod: 'GET',
            body: JSON.stringify(objSuccess),
        };

        // Invoke putItemHandler()
        const result = await lambda.getDiscussionHandler(event,"",()=>{});
        const expectedResult = statusCode.MethodNotAllow

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult);
    });
});
