const { updateEmployeeAccountsTableAccountBalance } = require('../employeeAccountsTable')

module.exports = async ({ cardId, accountBalance: currentAccountBalance }, body) => {
    const updateBalance = JSON.parse(body).updateBalance
    const newBalance = (currentAccountBalance + updateBalance)
    try {
        //could have liked to do a lot more error handling around this
        await updateEmployeeAccountsTableAccountBalance(cardId, newBalance);
        return {
            statusCode: 201,
            message: `Your account has now been updated, this may take a couple of seconds to appear in your account.`,
        };
    } catch (err){
        return {
            statusCode: 500, 
            message: `An error has occurred`
        }
    }
}