const assert = require('assert');
const chai = require('chai');
const should = require('chai').should();
const CloudCore = require('../../../cloudcore');

const accessToken = process.env.npm_config_api_key;
const client = new CloudCore.Client(accessToken);
describe('Order action', function() {
    describe('List of orders', function () {
        it('Should return list of orders', async function() {
            const orderList = await client.order.getList();
            chai.expect(orderList).to.be.a('array');
        });
    });

    describe('Order info', function () {
        it('Should return order info', async function() {
            const orderReference = '1541424253-988';
            const orderInfo = await client.order.getInfo(orderReference);
            chai.expect(orderInfo).to.be.an('object');
            chai.expect(orderInfo).to.have.property('reference');
            assert.equal(orderInfo.reference, orderReference);
        });
    });

    describe('Order cancel', function () {
        it('Order successfully canceled', async function() {
            const orderReference = '1541424253-988';
            const response = await client.order.cancel(orderReference);
            chai.expect(response).to.be.an('object');
            chai.expect(response).to.have.property('reference');
            assert.equal(response.status, 500);
        });
    });

    describe('Order log', function () {
        it('Should return order log', async function() {
            const orderReference = '1541424253-988';
            const orderLog = await client.order.getLog(orderReference);
            chai.expect(orderLog).to.be.a('array');
        });
    });

    describe('Request order quote', function () {
        it('The quote should be successfully generated', async function () {
            const data = {
                "country": "NL",
                "items": [
                    {
                        "reference": "99",
                        "product": "textbook_cw_a6_p_bw",
                        "count": 2,
                        "options": [
                            {
                                "type": "cover_finish_gloss",
                                "count": 1
                            },
                            {
                                "type": "pageblock_80off",
                                "count": 1
                            },
                            {
                                "type": "cover_130mcg",
                                "count": 1
                            },
                            {
                                "type": "total_pages",
                                "count": 100
                            }
                        ]
                    }
                ]
            };

            const quote = await client.order.quote(data);
            chai.expect(quote).to.be.an('object');
            should.exist(quote.price);
        });

        it('The quote can`t be generated because the country is missing', async function () {
            const data = {
                "items": [
                    {
                        "reference": "1",
                        "product": "brochure_pb_a5_p_fc",
                        "count": 68,
                        "options": [
                            {
                                "type": "pageblock_130mcs",
                                "count": 1
                            },
                            {
                                "type": "cover_200mcs",
                                "count": 1
                            },
                            {
                                "type": "total_pages",
                                "count": 100
                            }
                        ]
                    }
                ]
            };

            try {
                await client.order.quote(data)
            } catch (e) {
                assert.equal(e.error.info, '"country" is required');
            }
        })
    });

    describe('Quote info', function () {
        it('Should return quote info', async function() {
            const quote = '989b580ceebd192cd7a3046905f484d5f459cf8184077be9de759d9f78514a0d';
            const quoteInfo = await client.order.quoteInfo(quote);
            assert.equal(quoteInfo.quote, quote);
        });

        it('Should return error, because quote doesn`t exist.', async function() {
            const quote = '111';
            const quoteInfo = await client.order.quoteInfo(quote);
            should.not.exist(quoteInfo.quote);
        });
    });

    describe('Create new order', function () {
        it('The order can`t be created because the quote hash is required.', async function () {
            const data = {
                "reference": "order-" + Math.random(),
                "email": "test@mail.com",
                "addresses": [
                    {
                        "type": "delivery",
                        "firstname": "John",
                        "lastname": "Doe",
                        "street1": "Street1",
                        "zip": "1071 JA",
                        "city": "Amsterdam",
                        "country": "NL",
                        "email": "test@mail.com",
                        "phone": "+31-655-538-848"
                    }
                ],
                "items": [
                    {
                        "reference": "item-1",
                        "product": "brochure_pb_a5_p_fc",
                        "count": 1,
                        "files": [
                            {
                                "type": "cover",
                                "url": "https://s3-eu-west-1.amazonaws.com/demo.cloudprinter.com/b52f510a5e2419f67c4925153ec0c080_v2/CP_Sample_doc_A4_Book_Cover_Textbook_80_gsm_Casewrap_v2.1.pdf",
                                "md5sum": "15c518d3d105ecaaab014df2456dd22b"
                            },
                            {
                                "type": "book",
                                "url": "https://s3-eu-west-1.amazonaws.com/demo.cloudprinter.com/b52f510a5e2419f67c4925153ec0c080_v2/CP_Sample_doc_A4_Book_Interior_Textbook_v2.1.pdf",
                                "md5sum": "15c518d3d105ecaaab014df2456dd22b"
                            }
                        ],
                        "options": [
                            {
                                "type": "cover_finish_gloss",
                                "count": 1
                            },
                            {
                                "type": "pageblock_80off",
                                "count": 1
                            },
                            {
                                "type": "cover_130mcg",
                                "count": 1
                            },
                            {
                                "type": "total_pages",
                                "count": 100
                            }
                        ],
                        "quote": "123"
                    }
                ]
            };

            try {
                await client.order.create(data)
            } catch (e) {
                assert.equal(e.error.info, 'Quote hash not found or expired');
            }
        });

        it('The order can`t be created because the reference is required.', async function () {
            const data = {
                "email": "test@mail.com",
                "addresses": [
                    {
                        "type": "delivery",
                        "firstname": "John",
                        "lastname": "Doe",
                        "street1": "Street1",
                        "zip": "1071 JA",
                        "city": "Amsterdam",
                        "country": "NL",
                        "email": "test@mail.com",
                        "phone": "+31-655-538-848"
                    }
                ],
                "items": [
                    {
                        "reference": "item-1",
                        "product_reference": "brochure_pb_a5_p_fc",
                        "count": 1,
                        "files": [
                            {
                                "type": "cover",
                                "url": "https://s3-eu-west-1.amazonaws.com/demo.cloudprinter.com/b52f510a5e2419f67c4925153ec0c080_v2/CP_Sample_doc_A4_Book_Cover_Textbook_80_gsm_Casewrap_v2.1.pdf",
                                "md5sum": "15c518d3d105ecaaab014df2456dd22b"
                            },
                            {
                                "type": "book",
                                "url": "https://s3-eu-west-1.amazonaws.com/demo.cloudprinter.com/b52f510a5e2419f67c4925153ec0c080_v2/CP_Sample_doc_A4_Book_Interior_Textbook_v2.1.pdf",
                                "md5sum": "15c518d3d105ecaaab014df2456dd22b"
                            }
                        ],
                        "options": [
                            {
                                "type": "cover_finish_gloss",
                                "count": 1
                            },
                            {
                                "type": "pageblock_80off",
                                "count": 1
                            },
                            {
                                "type": "cover_130mcg",
                                "count": 1
                            },
                            {
                                "type": "total_pages",
                                "count": 100
                            }
                        ],
                        "quote": "989b580ceebd192cd7a3046905f484d5f459cf8184077be9de759d9f78514a0d"
                    }
                ]
            };

            try {
                await client.order.create(data)
            } catch (e) {
                assert.equal(e.error.info, '"reference" is required');
            }
        });

        it('The order with stock item created', async function () {
            const data = {
                "reference": "order-" + Date.now(),
                "email": "test@mail.com",
                "addresses": [
                    {
                        "type": "delivery",
                        "firstname": "John",
                        "lastname": "Doe",
                        "street1": "Street1",
                        "zip": "1071 JA",
                        "city": "Amsterdam",
                        "country": "NL",
                        "email": "test@mail.com",
                        "phone": "+31-655-538-848"
                    }
                ],
                "items": [
                    {
                        "reference": "item-1",
                        "product_reference": "brochure_pb_a5_p_fc",
                        "count": 1,
                        "shipping_level": "cp_fast"
                    }
                ]
            };

            const orderResponse = await client.order.create(data)
            assert.isNotEmpty(orderResponse);
        });
    });
});
