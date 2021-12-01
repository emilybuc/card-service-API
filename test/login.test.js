const assert = require('assert');
const AWSMock = require('aws-sdk-mock');

const index = require('../login/index');
const initialiseDynamoDB = require('./initialiseDB')

afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
});

describe('Login', () => {
    it('returns Good Afternoon Hugo Buckley, please enter in your pin', async () => {
        initialiseDynamoDB('employee-accounts-table');
        const result = await index.handler({queryStringParameters: {cardId: '1234'}});
        assert.equal(result.statusCode, 200);
        assert.equal(result.body, '{"message":"Good afternoon Hugo Buckley, please enter in your pin"}')
    });
    it('returns Your card is not assigned, you are being redirected to signup', async () => {
        initialiseDynamoDB();
        const result = await index.handler({ queryStringParameters: { cardId: '0000' } });
        assert.equal(result.statusCode, 404);
        assert.equal(result.body, '{"message":"Your card is not assigned, you are being redirected to signup"}')
    });
});
