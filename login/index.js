var AWS = require('aws-sdk');

exports.handler = async (event) => {
    const cardId = event.queryStringParameters.cardId

    const time = () => {
        const currentTime = new Date().toLocaleTimeString()
        if (currentTime.includes("AM")) {
            return "Good morning"
        }
        return "Good afternoon"
    }
    const getEmployeeAccountsTable = async () => {
        var params = {
            TableName: 'employee-accounts-table',
            Key: {
                cardId
            }
        };
        const documentClient = new AWS.DynamoDB.DocumentClient();
        const data = await documentClient.get(params).promise();

        if (Object.keys(data).length === 0) {
            return { statusCode: 404, message: `Your card is not assigned, you are being redirected to signup` }
        }
        return { statusCode: 200, message: `${time()} ${data.Item.name}, please enter in your pin` }
    }
    const { statusCode, message } = await getEmployeeAccountsTable();

    return {
        statusCode,
        body: JSON.stringify({ message }),
    };
};
