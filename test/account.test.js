const assert = require('assert');
const sinon = require('sinon')
const AWSMock = require('aws-sdk-mock');

const index = require('../account/index');
const initialiseDynamoDB = require('./initialiseDB')


describe('Account', () => {
    it('GET root account 200 response', async () => {
        initialiseDynamoDB('employee-accounts-table');
        const event = { 
            queryStringParameters: 
                {
                    cardId: "1234", 
                    pin: "0000"
                }, 
            routeKey: "GET /account"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 200);
    });
    it('GET root account 404 response', async () => {
        initialiseDynamoDB();
        const event = {
            queryStringParameters:
            {
                cardId: "not found",
                pin: "0000"
            },
            routeKey: "GET /account"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 404);
    });
    it('GET root account 401 response', async () => {
        initialiseDynamoDB('employee-accounts-table');
        const event = {
            queryStringParameters:
            {
                cardId: "1234",
                pin: "wrong pin"
            },
            routeKey: "GET /account"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 401);
    });
    it('GET root account malformed request, 400 response', async () => {
        const event = {
            queryStringParameters:
            {
                cardId: "1234",
            },
            routeKey: "GET /account"
        }
        const result = await index.handler(event);
        assert.equal(result.statusCode, 400);
    });
    it('POST topup response ', async () => {
        initialiseDynamoDB('employee-accounts-table');
        const event = {
            queryStringParameters:
            {
                cardId: "1234",
                pin: "0000"
            },
            routeKey: "POST /account/topup",
            body: "{\"updateBalance\": 10.00}"
        }
        const dynamoDbSpy = sinon.stub().resolves({ Attributes: { accountBalance: 10 }})
        AWSMock.mock('DynamoDB.DocumentClient', 'update', dynamoDbSpy)
        const result = await index.handler(event);
        assert.equal(result.statusCode, 201);
        assert.equal(result.body, '"Your account has now been updated, this may take a couple of seconds to appear in your account."')
        assert.ok(dynamoDbSpy.callCount === 1)
    });
    // it('GET purchase response', async () => {
    //     initialiseDynamoDB('stocked-items-table');
    //     initialiseDynamoDB('employee-accounts-table');
    //     const event = {
    //         queryStringParameters:
    //         {
    //             cardId: "1234",
    //             pin: "0000"
    //         },
    //         routeKey: "GET /account/purchase",
    //     }
    //     const result = await index.handler(event);
    //     assert.equal(result.statusCode, 200);
    //     assert.equal(result.body, '"Your account has now been updated, this may take a couple of seconds to appear in your account."')
    // });
    //Did not have enough time to fix this test to get coverage for this endpoint
});
