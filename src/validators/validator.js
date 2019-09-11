const Joi = require('joi');

export class Validator {
    constructor(json) {
        this.json = json
    }

    doValidation(schema) {
        const validationResult = Joi.validate(this.json, schema, {allowUnknown: true, abortEarly:true})

        if (validationResult.error !== null) {
            let errorMessage = validationResult.error.details[0].message;
            if (validationResult.error.details[0].path.length > 1) {
                errorMessage += '. Path: ' + validationResult.error.details[0].path.join('.');
            }

            validationResult.error.data = {
                error: {
                    type: 'json_data_schema_is_not_valid',
                    info: errorMessage
                }
            };
        }

        return validationResult;
    }
}
