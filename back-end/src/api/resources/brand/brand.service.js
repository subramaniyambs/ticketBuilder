import Joi from 'joi';

export default {
	validateCreateSchema(body) {
		const schema = Joi.object().keys({
			name: Joi.string().required()
		});
		const { error, value } = Joi.validate(body, schema);
		if (error && error.details) {
			return { error };
		}
		return { value };
	}
};
