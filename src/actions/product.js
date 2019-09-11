export class Product {
    /**
     * @param client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Get products action.
     * @returns {*}
     */
    getList() {
        const data = {apikey: this.client.apiKey};
        return this.client.makePostRequest('products', data);
    }

    /**
     * Get product info action.
     * @param {string} productReference
     */
    getInfo(productReference) {
        const data = {
            apikey: this.client.apiKey,
            reference: productReference
        };
        return this.client.makePostRequest('products/info', data);
    }
}
