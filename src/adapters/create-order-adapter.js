const crypto = require('crypto');
const axios = require('axios');

export class CreateOrderAdapter {
    /**
     * Apply adapter for order json.
     * @param jsonOrderData
     * @returns {Promise<any[]|never>}
     */
    apply(jsonOrderData) {
        return this.setMD5ForFiles(jsonOrderData);
    }

    /**
     * Generate md5 for files.
     * @param jsonOrderData
     * @returns {Promise<any[] | never>}
     */
    setMD5ForFiles(jsonOrderData) {
        const promises = [];
        jsonOrderData.items.forEach((item) => {
            if (item.type !== 'stock') {
                item.files.forEach(async (file) => {
                    if (this.isUrl(file.url) && !file.md5sum) {
                        const promise = axios.request({
                            responseType: 'arraybuffer',
                            url: file.url,
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/pdf',
                            },
                        });
                        promises.push(promise);
                        promise.then((response) => {
                            file.md5sum = crypto.createHash('md5').update(new Buffer.from(response.data)).digest('hex');
                        });
                    }
                });
            }
        });

        return Promise.all(promises).then(() => jsonOrderData);
    }

    /**
     * Check, id string is url.
     * @param string
     * @returns {boolean}
     */
    isUrl(string) {
        const pattern = /^((http|https):\/\/)/;
        return pattern.test(string);
    }
}
