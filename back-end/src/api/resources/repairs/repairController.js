import HttpStatus from 'http-status-codes';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import Joi from 'joi';
import repair from './repair.model';
import repairService from './repair.service';



export default {
    findAll(req, res, next) {
        repair.find().then(repairs => res.json(repairs))
        .catch(err => res.status(500).json(err));
    },
    async create(req, res) {
		try {
			const { value, error } = repairService.validateCreateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const repair = await repair.create(value);
			return res.json(repair);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
    // create(req, res, next) {
	// 	const schema = Joi.object().keys({
	// 		// client: Joi.string().optional(),
	// 		category: Joi.string(),
	// 		brand: Joi.string(),
	// 		model: Joi.string(),
	// 		task: Joi.string(),
	// 		missing: Joi.string(),
	// 		reception_date: Joi.date(),
	// 		// reception_date: Joi.date('dd/MM/yyyy hh:mm'),
	// 		delivery_date: Joi.date(),
	// 		serial: Joi.string(),
	// 		usercode: Joi.string(),
	// 		price: Joi.number().integer(),
	// 		status: Joi.string(),
	// 		coment: Joi.string()
			
	// 	});
	// 	const { error, value } = Joi.validate(req.body, schema);
	// 	if (error && error.details) {
	// 		return res.status(HttpStatus.BAD_REQUEST).json(error);
	// 	}
	// 	repair.create(value)
	// 		.then((repair) => res.json(repair))
	// 		.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    // },
    
    
};