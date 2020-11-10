// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');
// Import all functions from put-item.js
const lambda = require('../../../src/user/put-user');

const { statusCode } = require('../../../src/util')

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

    //Mock data
    const objSuccess =
    {
        Bio: "Human",
        DateBirth: Date.now,
        AccountEmail: "emai@gmail.com",
        ContactInformation: "",
        AccessLevel: 1,
        ProfilePictureURL: "URL",
        StudentID: 123324231
    }

    const objUpdate =
    {
        Bio: "Human",
        DateBirth: Date.now,
        AccountEmail: "emai@gmail.com",
        ContactInformation: "",
        AccessLevel: 1,
        ProfilePictureURL: "URL",
        StudentID: 123324231
    }

    const objfail =
    {
        Bio: "Human",
        DateBirth: Date.now,
        ContactInformation: "",
        AccessLevel: 1,
        ProfilePictureURL: "URL",
        StudentID: 123324231
    }

    // This test invokes putItemHandler and compares the result
    it('should add item', () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const event = {
            httpMethod: 'POST',
            body: objSuccess,
        };

        // Invoke putItemHandler()
        const result = lambda.putUserHandler(event);
        const expectedResult = {
            statusCode: 200,
            body: event.body,
        };

        // Compare the result with the expected result
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
    });

    it('should edit item', () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const event = {
            httpMethod: 'POST',
            body: objUpdate,
        };

        // Invoke putItemHandler()
        const result = lambda.putUserHandler(event);
        const expectedResult = {
            statusCode: 200,
            body: event.body,
        };

        // Compare the result with the expected result
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
    });

    it('should fail with a 405', () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const event = {
            httpMethod: 'GET',
            body: objSuccess,
        };

        // Invoke putItemHandler()
        const result = lambda.putUserHandler(event);
        const expectedResult = {
            statusCode: statusCode.MethodNotAllow
        };

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });

    it('should fail with a 400', () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const event = {
            httpMethod: 'POST',
            body: objfail,
        };

        // Invoke putItemHandler()
        const result = lambda.putUserHandler(event);
        const expectedResult = {
            statusCode: statusCode.BadRequest
        };

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });
});
