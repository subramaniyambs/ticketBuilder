import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Missing from './missing.model';
import missingService from './missing.service';

export default {
	create(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().required()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Missing.create(value)
			.then((missing) => res.json(missing))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	findAll(req, res, next) {
		const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
		const options = {
			page: parseInt(page, 10),
			limit: parseInt(perPage, 10),
		
		};

		const query = {};
		if (filter) {
			query.name = {
				$regex: filter
			};
		}

		if (sortField && sortDir) {
			options.sort = {
				[sortField]: sortDir
			};
		}

		Missing.paginate(query, options)
			.then((missings) => res.json(missings))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},

	// async create(req, res) {
	// 	try {
	// 		const { value, error } = missingService.validateCreateSchema(req.body);
	// 		if (error && error.details) {
	// 			return res.status(BAD_REQUEST).json(error);
	// 		}
	// 		const missing = await missing.create(value);
	// 		return res.json(missing);
	// 	} catch (err) {
	// 		return res.status(INTERNAL_SERVER_ERROR).json(err);
	// 	}
	// },
	async findOne(req, res) {
		try {
			const missing = await Missing.findById(req.params.id);
			if (!missing) {
				return res.status(NOT_FOUND).json({ err: 'missing not found' });
			}
			return res.json(missing);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async delete(req, res) {
		try {
			const missing = await Missing.findOneAndRemove({ _id: req.params.id });
			if (!missing) {
				return res.status(NOT_FOUND).json({ err: 'could not delete missing' });
			}
			return res.json(missing);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async update(req, res) {
		try {
			const { value, error } = missingService.validateUpdateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const missing = await missing.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
			return res.json(missing);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	}
};
