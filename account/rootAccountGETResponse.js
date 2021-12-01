module.exports = ({ name, accountBalance }) => {
    return {
        statusCode: 200,
        message: `${name}, you currently have £${accountBalance} in your account. What would you like to do? please select 1. top-up or 2. purchase food`
    };
}