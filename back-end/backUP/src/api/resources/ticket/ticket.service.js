import Joi from 'joi';

export default {
	validateCreateSchema(body) {
		const schema = Joi.object().keys({
			category: Joi.string().required(),
			brand: Joi.string().required(),
			model: Joi.string().required(),
			task: Joi.string().required(),
			missing: Joi.string().required(),
			serial: Joi.string().optional(),
			usercode: Joi.string().optional(),
			price: Joi.number().optional(),
			status: Joi.string().required(),
			reception_date: Joi.date().required(),
			delivery_date: Joi.date().required(),
			coment: Joi.date().optional(),
			client: Joi.string().optional()
		});
		const { error, value } = Joi.validate(body, schema);
		if (error && error.details) {
			return { error };
		}
		return { value };
	}
};
