const AWS = require('aws-sdk');

module.exports = async (cardId, body) => {
    const { employeeId, name, mobileNo, email, pin } = JSON.parse(body)

    const items = {
        cardId,
        employeeId,
        name,
        mobileNo,
        email,
        pin,
        accountBalance: 0
    }

    const tableParams = {
        TableName: 'employee-accounts-table',
        Item: Object.assign(items),
    }
    const dbClient = new AWS.DynamoDB.DocumentClient()
    try {
        await dbClient.put(tableParams, function (err,) {
            if (err) console.log(err);
        }).promise()
        return { statusCode: 201, message: `${name} your signed up! You will now be redirected to the login page where you will be prompted with your pin` }
    } catch (err) {
        return { statusCode: 400, message: "Bad request" }
    }
}