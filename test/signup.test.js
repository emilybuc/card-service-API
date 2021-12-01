const assert = require('assert');
const sinon = require('sinon')
const AWSMock = require('aws-sdk-mock');

const index = require('../signup/index');
const initialiseDynamoDB = require('./initialiseDB')

describe('Signup', async () => {
    it('Returns signup message', async () => {
        const event = {
            queryStringParameters: { cardId: "kfdkJ239ksasjJ62" },
            routeKey: "GET /signup"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 200);
        assert.equal(result.body, '"Your card isn’t registered, please enter in your EmployeeID, Name, Email, mobile number and secret pin. Please remember your pin as you will need it for logging in"')
    });

    it('Returns 201 response and added to db', async () => {
        initialiseDynamoDB()
        const dynamoDbSpy = sinon.stub().resolves("PUT")
        AWSMock.mock('DynamoDB.DocumentClient', 'put', dynamoDbSpy)
        const event = { 
            queryStringParameters: { cardId: "kfdkJ239ksasjJ62" }, 
            body: "{\"employeeId\": \"dawk23c\", \"mobileNo\": \"07238198321\",\"name\": \"James McDonald\",\"pin\":\"0000\",\"email\": \"a.name@f1.com\"}",
            routeKey: "POST /signup"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 201);
        assert.equal(result.body, '"James McDonald your signed up! You will now be redirected to the login page where you will be prompted with your pin"')
    });
    //I would have liked to add more tests around the error handling
});
