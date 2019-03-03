import Joi from 'joi';
import HttpStatus, { NOT_FOUND } from 'http-status-codes';
import Model from './model.model';
import modelService from './model.service';
import userService from '../user/user.service';

var moment = require('moment');

export default {
	
	async findModels(req, res) {
		try {
			const models = await Model.find();
			return res.json(models);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	create(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().required(),

			brand: Joi.string().required()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Model.create(value)
			.then((model) => res.json(model))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	findOne(req, res) {
		const { id } = req.params;
		Model.findById(id)
			.populate('brand')
			.then((brand) => {
				if (!brand) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any brand' });
				}
				return res.json(brand);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	delete(req, res) {
		const { id } = req.params;
		Model.findByIdAndRemove(id)
			.then((model) => {
				if (!model) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any model' });
				}
				return res.json(model);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	update(req, res) {
		const { id } = req.params;
		const schema = Joi.object().keys({
			name: Joi.string().optional(),

			brand: Joi.string().optional()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Model.findOneAndUpdate({ _id: id }, value, { new: true })
			.then((model) => res.json(model))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	findByBrand(req, res) {
		const { id } = req.params;
		Model.find({'brand':id})
			.then((model) => {
				if (!model) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any Model' });
				}
				return res.json(model);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	}
	// findByBrand(req, res) {
	// 	console.log("tessssssssst")
	// 	const { id } = req.params;
	// 	Model.findById(id)
	// 		.populate('brand')
	// 		.then((brand) => {
	// 			if (!brand) {
	// 				return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any brand' });
	// 			}
	// 			return res.json(brand);
	// 		})
	// 		.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	// }
};
