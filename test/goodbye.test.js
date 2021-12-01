const assert = require('assert');
const index = require('../goodbye/index');

describe('Goodbye', async () => {
    it('returns Goodbye!', async () => {
        const result = await index.handler({});
        assert.equal(result.statusCode, 200);
        assert.equal(result.body, '"Goodbye!"')
    });
    it('returns Goodbye {name}!', async () => {
        const result = await index.handler({ queryStringParameters: { name: "Hugo Buckley" } });
        assert.equal(result.statusCode, 200);
        assert.equal(result.body, '"Goodbye Hugo Buckley!"')
    });
});
