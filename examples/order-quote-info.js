const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const quoteHash = '8dfd769781297bcc9f38a61207bd6dcc729b7ce4fd77ed98c5e1105efd2d3160';
const cloudCoreClient = new CloudCore.Client(apiKey);

cloudCoreClient.order.quoteInfo(quoteHash)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
