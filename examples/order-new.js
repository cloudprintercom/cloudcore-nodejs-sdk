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
            "quote": "8dfd769781297bcc9f38a61207bd6dcc729b7ce4fd77ed98c5e1105efd2d3160"
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
