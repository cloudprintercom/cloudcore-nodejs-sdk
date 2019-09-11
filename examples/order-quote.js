const CloudCore = require('@cloudprinter/cloudcore');

const apiKey = '*';
const cloudCoreClient = new CloudCore.Client(apiKey);

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
}

cloudCoreClient.order.quote(data)
    .then(function (response) {
        console.log(response.shipments[0].quotes);
    })
    .catch(function (error) {
        console.log(error);
    });
