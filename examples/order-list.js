const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const cloudCoreClient = new CloudCore.Client(apiKey);

cloudCoreClient.order.getList()
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
