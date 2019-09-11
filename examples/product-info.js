const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const productReference = 'flyer_ss_a4_fc';
const cloudCoreClient = new CloudCore.Client(apiKey);

cloudCoreClient.product.getInfo(productReference)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
