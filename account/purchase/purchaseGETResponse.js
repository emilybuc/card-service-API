const { scanStockedItemsTable } = require('../employeeAccountsTable')

module.exports = async () => {
    const data = await scanStockedItemsTable();
    return {
        statusCode: 200,
        message: data,
    };
    //Would have liked to implement more error handling
}