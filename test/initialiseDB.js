const AWSMock = require('aws-sdk-mock');

module.exports = (response) => {
    if (response === 'employee-accounts-table') {
        const item = {
            Item:
            {
                cardId: '1234',
                employeeId: '1a2b3c',
                pin: "0000",
                name: "Hugo Buckley",
                accountBalance: 0
            },
        };
        AWSMock.mock('DynamoDB.DocumentClient', 'get', item);
    } else if (response == 'stocked-items-table'){
        const item = {
            Item:
            {
                productId: '1',
                name: 'Burger',
                price: 7.99,
            },
        };
        AWSMock.mock('DynamoDB.DocumentClient', 'get', item);
    } else {
        AWSMock.mock('DynamoDB.DocumentClient', 'get', {});
    }
}