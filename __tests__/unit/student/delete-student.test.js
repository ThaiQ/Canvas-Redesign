// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');
// Import all functions from put-item.js
const lambda = require('../../../src/student/delete-student');

const { statusCode, reponseFormat } = require('../../../src/util')

// This includes all tests for putItemHandler
describe('Test deleteStudentHandler', () => {
    let deleteSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB put method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        deleteSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete');
    });

    // Clean up mocks
    afterAll(() => {
        deleteSpy.mockRestore();
    });

    //Mock data
    const {objSuccess, objUpdate, objfail} = require('../../../MockData/student')

    // This test invokes putItemHandler and compares the result
    it('should delete item', async () => {
        // Return the specified value whenever the spied put function is called
        deleteSpy.mockReturnValue({
            promise: () => Promise.resolve(reponseFormat(statusCode.statusCode, objSuccess)),
        });

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(objSuccess),
        };

        // Invoke putItemHandler()
        const result = await lambda.deleteStudentHandler(event,"",()=>{});
        const expectedResult = reponseFormat(statusCode.Success, {ID: objSuccess.ID})

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should fail with a 400', async () => {
        const event = {
            httpMethod: 'POST',
            body: objfail,
        };

        // Invoke putItemHandler()
        const result = await lambda.deleteStudentHandler(event,"",()=>{});
        const expectedResult = {
            statusCode: statusCode.BadRequest
        };

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });

    it('should fail with a 405', async () => {
        const event = {
            httpMethod: 'GET',
            body: objSuccess,
        };

        // Invoke putItemHandler()
        const result = await lambda.deleteStudentHandler(event,"",()=>{});
        const expectedResult = {
            statusCode: statusCode.MethodNotAllow
        };

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });
});
