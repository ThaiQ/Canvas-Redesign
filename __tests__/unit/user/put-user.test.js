// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from put-item.js
const lambda = require('../../../src/user/put-user');

// This includes all tests for putItemHandler
describe('Test putUserHandler', () => {
    let putSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB put method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });

    // Clean up mocks
    afterAll(() => {
        putSpy.mockRestore();
    });

    // This test invokes putItemHandler and compares the result
    it('should add id to the table', () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const obj = {
            Bio : "Human",
            DateBirth : Date.now,
            AccountEmail : "emai@gmail.com",
            ContactInformation : "",
            AccessLevel : 1,
            ProfilePictureURL : "URL",
            StudentID : 123324231}

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(obj),
        };

        // Invoke putItemHandler()
        const result = lambda.putUserHandler(event);
        const expectedResult = {
            statusCode: 200,
            body: event.body,
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
