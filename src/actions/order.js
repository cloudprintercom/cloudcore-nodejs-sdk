import { OrderValidator } from "../validators/order-validator";
import { OrderQuoteValidator } from "../validators/order-quote-validator";
import { CreateOrderAdapter } from "../adapters/create-order-adapter";

export class Order {
    /**
     * @param client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Create order action.
     * @param data
     * @returns {Promise}
     */
    create(data) {
        data.apikey = this.client.apiKey;

        const createOrderAdapter = new CreateOrderAdapter();
        return createOrderAdapter.apply(data).then((data) => {
            let orderValidator = new OrderValidator(data);

            let validationResult = orderValidator.validate();
            if (validationResult.error !== null) {
                return Promise.reject(validationResult.error.data);
            } else {
                return this.client.makePostRequest('orders/add', data);
            }
        });
    }

    /**
     * Get order list action.
     * @returns {Promise}
     */
    getList() {
        const data = {apikey: this.client.apiKey};
        return this.client.makePostRequest('orders', data);
    }

    /**
     * Cancel order action.
     * @param orderReference
     * @returns {*}
     */
    cancel(orderReference) {
        const data = {
            apikey: this.client.apiKey,
            reference: orderReference
        };
        return this.client.makePostRequest('orders/cancel', data);
    }

    /**
     * Get order info action.
     * @param orderReference
     * @returns {*}
     */
    getInfo(orderReference) {
        const data = {
            apikey: this.client.apiKey,
            reference: orderReference
        };
        return this.client.makePostRequest('orders/info', data);
    }

    /**
     * Get order log action.
     * @param orderReference
     * @returns {*}
     */
    getLog(orderReference) {
        const data = {
            apikey: this.client.apiKey,
            reference: orderReference
        };
        return this.client.makePostRequest('orders/log', data);
    }

    /**
     * Request order quote action.
     * @param data
     * @returns {*}
     */
    quote(data) {
        data.apikey = this.client.apiKey;

        let orderQuoteValidator = new OrderQuoteValidator(data);
        let validationResult = orderQuoteValidator.validate();
        if (validationResult.error !== null) {
            return Promise.reject(validationResult.error.data);
        } else {
            return this.client.makePostRequest('orders/quote', data);
        }
    }

    /**
     * Get quote info action.
     * @param quoteHash
     * @returns {*}
     */
    quoteInfo(quoteHash) {
        const data = {
            apikey: this.client.apiKey,
            quote: quoteHash
        };
        return this.client.makePostRequest('orders/quote/info', data);
    }
}
