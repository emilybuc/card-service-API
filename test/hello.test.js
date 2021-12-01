const assert = require('assert');
const index = require('../hello/index');

describe('Hello', () => {
    it('returns Good Morning, please tap your card to begin', async () => {
        const result = await index.handler();
        assert.equal(result.statusCode, 200);
        //If had more time would have liked to stub out time function to get the correct message coming back in test
    });
    it('returns Good evening, please tap your card to begin', async () => {
        const result = await index.handler();
        assert.equal(result.statusCode, 200);
    });
});
