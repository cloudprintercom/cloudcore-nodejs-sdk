import {Validator} from "./validator";

const Joi = require('joi');

export class OrderQuoteValidator extends Validator {
    validate() {
        let schema = Joi.object().keys({
            apikey: Joi.string().required(),
            country: Joi.string().required(),
            state: Joi.string()
                .when('country', {is: Joi.valid('US', 'CA'), then: Joi.required()}),
            items: Joi.array().items(Joi.object({
                reference: Joi.string().required(),
                product: Joi.string().required(),
                count: Joi.number().min(1).required(),
                options: Joi.array().items(Joi.object({
                    type: Joi.string().required(),
                    count: Joi.required()
                }))
            })).min(1).required(),
        });

        return this.doValidation(schema);
    }
}
