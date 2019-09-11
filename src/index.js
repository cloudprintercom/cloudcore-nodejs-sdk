import { Order } from "./actions/order";
import { Product } from "./actions/product";

const axios = require('axios');

export class Client {
    /**
     * @param {string} apiKey
     */
    constructor(apiKey) {
        this.baseUrl = 'https://api.cloudprinter.com/cloudcore/1.0/';
        this.apiKey = apiKey;
        this.order = new Order(this);
        this.product = new Product(this);
    }

    /**
     * @param {string} uri
     * @param {object} data
     */
    makePostRequest(uri, data) {
        return axios.post(this.baseUrl + uri, data)
            .then(function (response) {
                return Promise.resolve(response.data);
            })
            .catch(function (error) {
                return Promise.reject(error.response.data);
            });
    }
}
