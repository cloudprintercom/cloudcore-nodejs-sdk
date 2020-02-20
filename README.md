# CloudCore NodeJS SDK
The Cloudprinter.com NodeJS SDK is a package with useful features that enable developers to easily integrate their platform with Cloudprinter.com and make requests and posts to our CloudCore API. This NodeJS SDK makes it easy to set up the integration to request instant pricing, post print orders and more. 

We at Cloudprinter.com have connected 150+ printers to print & ship print products in almost any country in the world. Whether this is around the corner or at the other side of the globe, we've got you covered: we can deliver 500+ different products in more than 100 countries currently.

Our platform makes use of smart routing algoritms to route any print job to the most local and qualified printer. Based on location, performance, price and production options, your print job is routed by these algorithms to the nearest printing facility near your delivery address to help you save on transit times and costs.

Visit our [website](https://www.cloudprinter.com) for more information on all the products and services that we offer.

Follow the [link](https://github.com/cloudprintercom/cloudcore-nodejs-sdk/wiki/NodeJS-SDK-CloudCore-documentation) to read the full documentation.

## Installation 
The CloudCore SDK can be installed with NPM. Run this command:
```
npm i @cloudprinter/cloudcore
```

## Prerequisites
* npm (for installation)
* node 6.0 or above
* Cloudprinter.com Print API account

## Authentication
Authentication is done via a predefined CloudCore API key. The CloudCore API key is found in the [Cloudprinter.com Dashboard](https://admin.cloudprinter.com).

## Examples

### Get list of orders.
```
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
```
### Create new order.
```
const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const cloudCoreClient = new CloudCore.Client(apiKey);

const data = {
    "reference": "order-1234",
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
            "reference": "299",
            "product": "brochure_pb_a5_p_fc",
            "count": 68,
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
                    "option_reference": "cover_finish_gloss",
                    "count": 1
                },
                {
                    "option_reference": "pageblock_80off",
                    "count": 1
                },
                {
                    "option_reference": "cover_130mcg",
                    "count": 1
                },
                {
                    "option_reference": "total_pages",
                    "count": 100
                }
            ],
            "quote": "*"
        }
    ]
}

cloudCoreClient.order.create(data)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
```

## Full documentation
Follow the [link](https://github.com/cloudprintercom/cloudcore-nodejs-sdk/wiki/NodeJS-SDK-CloudCore-documentation) to read the full documentation.
