const AWS = require('aws-sdk');
const employeeAccountsTableName = 'employee-accounts-table'
const getEmployeeAccountsTable = async (cardId) => {
    var params = {
        TableName: employeeAccountsTableName,
        Key: {
            cardId
        }
    };
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const data = await documentClient.get(params).promise();

    if (Object.keys(data).length === 0) {
        return { statusCode: 404, body: JSON.stringify(`Your card is not assigned, you are being redirected to signup`) };
    }
    return data.Item;
}
const updateEmployeeAccountsTableAccountBalance = async (cardId, newBalance) => {
    const params = {
        TableName: employeeAccountsTableName,
        Key: {
            cardId
        },
        ExpressionAttributeValues: {
            ':account_balance': newBalance,
        },
        ReturnValues: 'UPDATED_NEW',
        UpdateExpression: 'SET accountBalance = :account_balance',
    };
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const data = await documentClient.update(params).promise();
    return data.Attributes?.accountBalance;
}
const scanStockedItemsTable = async () => {
    var params = {
        TableName: 'stocked-items-table',
    };
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const data = await documentClient.scan(params).promise();

    if (Object.keys(data).length === 0) {
        console.log("not found")
        return;
    }
    return data.Items;
}

module.exports = { getEmployeeAccountsTable, updateEmployeeAccountsTableAccountBalance, scanStockedItemsTable };