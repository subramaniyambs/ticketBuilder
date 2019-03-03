import Joi from 'joi';


export default {
	validateCreateSchema(body) {
		const schema = Joi.object().keys({
		
			category: Joi.string().required(),
			brand: Joi.string().required(),
			model: Joi.string().required(),
			task: Joi.string().required(),
			missing: Joi.string().required(),
			reception_date: Joi.date().required(),
			// reception_date: Joi.date('dd/MM/yyyy hh:mm').required(),
			delivery_date: Joi.date().required(),
			serial: Joi.string().required(),
			usercode: Joi.string().required(),
			price: Joi.number().integer().required(),
			status: Joi.string().required(),
            coment: Joi.string().required(),
            client: Joi.string().required()
			
		});

		const { error, value } = Joi.validate(body, schema);
		if (error && error.details) {
			return { error };
		}
		return { value };
    },
}