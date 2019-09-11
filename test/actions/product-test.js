const assert = require('assert');
const chai = require('chai');
const CloudCore = require('../../../cloudcore');

const accessToken = process.env.npm_config_api_key;
const client = new CloudCore.Client(accessToken);
describe('Product action', function() {
    describe('List of products.', function () {
        it('Should return list of products', async function () {
            const productList = await client.product.getList();
            chai.expect(productList).to.be.a('array');
        });
    });

    describe('Product info.', function () {
        it('Should return product info', async function () {
            const productReference = 'textbook_cw_a6_p_bw';
            const productInfo = await client.product.getInfo(productReference);
            chai.expect(productInfo).to.be.an('object');
            chai.expect(productInfo).to.have.property('reference');
            assert.equal(productInfo.reference, productReference);
        });
    });
});
