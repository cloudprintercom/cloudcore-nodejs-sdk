import {Validator} from "./validator";
const Joi = require('joi');
const countriesWithoutZip = [
    'AE', 'AG', 'AO', 'AW', 'BF', 'BI', 'BJ', 'BM', 'BO', 'BQ', 'BS', 'BW', 'BZ', 'CD', 'CF', 'CG', 'CI', 'CK',
    'CM', 'CW', 'DJ', 'DM', 'ER', 'FJ', 'GA', 'GD', 'GH', 'GM', 'GQ', 'GY', 'HK', 'HM', 'IE', 'KI', 'KM', 'KN',
    'KP', 'LY', 'ML', 'MO', 'MR', 'MW', 'NA', 'NR', 'NU', 'PE', 'QA', 'RW', 'SB', 'SC', 'SL', 'SR', 'ST', 'SX',
    'SY', 'TD', 'TF', 'TG', 'TK', 'TL', 'TO', 'TT', 'TV', 'UG', 'VU'
];
const countriesWithState = ['US', 'CA'];

export class OrderValidator extends Validator {
    validate() {
        let schema = Joi.object().keys({
            apikey: Joi.string().required(),
            reference: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            addresses: Joi.array().label('111').items(Joi.object({
                type: Joi.string().required(),
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                street1: Joi.string().required(),
                zip: Joi.string()
                    .when('country', {is: Joi.valid(countriesWithoutZip), otherwise: Joi.required()}),
                country: Joi.string().required(),
                state: Joi.string()
                    .when('country', {is: Joi.valid(countriesWithState), then: Joi.required()}),
                city: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
            })).min(1).required(),
            items: Joi.array().items(
                Joi.object({
                    reference: Joi.string().required(),
                    product: Joi.string().required(),
                    count: Joi.number().min(1).required(),
                    files: Joi.when('type', {
                        is: Joi.invalid('stock'),
                        then: Joi.array().items(Joi.object({
                            type: Joi.string().required(),
                            url: Joi.string().uri().required(),
                            md5sum: Joi.string().required()
                        })).required()
                    }),
                    options: Joi.array().items(Joi.object({
                        type: Joi.string().required(),
                        count: Joi.required()
                    }))
                })

                // Don`t require quote, shipping_level, shipping_option for reordering
                .or('quote', 'shipping_level', 'shipping_option', 'reorderOrderReference')
                    .error(() => {
                        return {
                            message: 'The quote or shipping_level need to be set',
                        };
                    }),
            ).min(1).required(),
        });

        return this.doValidation(schema);
    }
}
