exports.handler = async (event) => {
    var response = `Goodbye!`
    
    //option chaining if queryStringParameters doesn't exist
    if(event.queryStringParameters?.name){
        response = `Goodbye ${event.queryStringParameters.name}!`
    } 
    
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
