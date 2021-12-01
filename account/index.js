const AWS = require('aws-sdk');
const { getEmployeeAccountsTable } = require('./employeeAccountsTable')
const rootAccountGETResponse = require("./rootAccountGETResponse")
const topupPOSTResponse = require("./topup/topupPOSTResponse")
const purchaseGETResponse = require("./purchase/purchaseGETResponse")
const purchasePOSTResponse = require("./purchase/purchasePOSTResponse")

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async ({ queryStringParameters, routeKey, body }) => {
    if (!queryStringParameters || !queryStringParameters.cardId || !queryStringParameters.pin) {
        return {
            statusCode: 400,
            body: JSON.stringify("bad request, you are being redirected back to default endpoint"),
        };
    }

    const { cardId, pin: enteredPin } = queryStringParameters;
    const data = await getEmployeeAccountsTable(cardId);

    //error handling
    if (data.statusCode == 404) {
        return data;
    } else if (data.pin != enteredPin) {
        console.log(data)
        return { statusCode: 401, body: JSON.stringify("Your pin is incorrect, you are being redirected back to login") };
    }
    //different http methods
    const getResponse = async (data, routeKey) => {
        if (routeKey == "GET /account") {
            var { statusCode, message } = await rootAccountGETResponse(data)
        } else if (routeKey == "POST /account/topup") {
            var { statusCode, message } = await topupPOSTResponse(data, body)
        } else if (routeKey == "GET /account/purchase") {
            var { statusCode, message } = await purchaseGETResponse(data)
        } else if (routeKey == "POST /account/purchase") {
            var { statusCode, message } = await purchasePOSTResponse(data)
        }
        return { statusCode, message }
    }
    const { statusCode, message } = await getResponse(data, routeKey)
    return {
        statusCode,
        body: JSON.stringify(message),
    };
};
