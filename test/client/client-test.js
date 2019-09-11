const assert = require('assert');
const CloudCore = require('../../../cloudcore');

describe('Client test', function() {
    const apiKey = process.env.npm_config_api_key;
    const client = new CloudCore.Client(apiKey);
    describe('Check client', function() {
        it('Api key should set correct', function() {
            assert.equal(client.apiKey,  apiKey);
        });

        it('Actions should be initialized and ready for use', function () {
            assert.equal(typeof client.order, 'object');
            assert.equal(typeof client.product, 'object');
        });
    });
});
