import Joi from 'joi';

export default {
	validateCreateSchema(body) {
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			address: Joi.string().optional(),
			post: Joi.string().optional(),
			city: Joi.string().optional(),
			phone: Joi.string().optional(),
			email: Joi.string().email().optional(),
			siren: Joi.string().optional(),
			tva: Joi.string().optional()
		});
		const { error, value } = Joi.validate(body, schema);
		if (error && error.details) {
			return { error };
		}
		return { value };
	}
};
