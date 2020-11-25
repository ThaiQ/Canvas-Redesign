// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');
// Import all functions from put-item.js
const lambda = require('../../../src/assignments/delete-question');

const { statusCode, reponseFormat } = require('../../../src/util')

// This includes all tests for putItemHandler
describe('Test deleteQuestionHandler', () => {
    let putSpy;
    let getSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB put method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    // Clean up mocks
    afterAll(() => {
        putSpy.mockRestore();
    });

    //Mock data
    const delQuestion = require('../../../MockData/question')
    const questionTest = require('../../../MockData/assignment')
    

    // This test invokes putItemHandler and compares the result
    it('should delete item', async () => {
        // Return the specified value whenever the spied put function is called
        getSpy.mockReturnValue({
            promise: () => Promise.resolve(questionTest.questionTest),
        });

        putSpy.mockReturnValue({
            promise: () => Promise.resolve(reponseFormat(statusCode.statusCode, delQuestion.delQuestion)),
        });

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(delQuestion.delQuestion),
        };

        // Invoke putItemHandler()
        const result = await lambda.deleteQuestionHandler(event,"",()=>{});
        const expectedResult = {"body": "0", "statusCode": 200}

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should fail with a 405', async () => {
        const event = {
            httpMethod: 'GET',
            body: delQuestion.delQuestionFail,
        };

        // Invoke putItemHandler()
        const result = await lambda.deleteQuestionHandler(event,"",()=>{});
        const expectedResult = {
            statusCode: statusCode.MethodNotAllow
        };

        // Compare the result with the expected result
        expect(result.statusCode).toEqual(expectedResult.statusCode);
    });
});
