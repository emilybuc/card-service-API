const signupPOSTResponse = require('./signupPOSTResponse.js')

exports.handler = async ({ queryStringParameters, routeKey, body }) => {
    if (!queryStringParameters || !queryStringParameters.cardId) {
        return {
            statusCode: 400,
            body: JSON.stringify("bad request, you are being redirected back to default endpoint"),
        };
    }
    const { cardId } = queryStringParameters;
    if (routeKey == "GET /signup") {
        var statusCode = 200
        var message = "Your card isn’t registered, please enter in your EmployeeID, Name, Email, mobile number and secret pin. Please remember your pin as you will need it for logging in"
    }
    else if (routeKey == "POST /signup") {
        var { statusCode, message } = await signupPOSTResponse(cardId, body);
    }
    return {
        statusCode: statusCode,
        body: JSON.stringify(message),
    };
};
