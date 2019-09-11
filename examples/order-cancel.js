const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const cloudCoreClient = new CloudCore.Client(apiKey);
const orderReference = 'order-123';

cloudCoreClient.order.cancel(orderReference)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
