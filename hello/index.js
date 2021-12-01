exports.handler = async () => {
    const time = () => {
        const currentTime = new Date().toLocaleTimeString()
        if (currentTime.includes("AM")) {
            return "Good morning"
        }
        return "Good afternoon"
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(time() + ", please tap your card to begin"),
    };
    return response;
};
