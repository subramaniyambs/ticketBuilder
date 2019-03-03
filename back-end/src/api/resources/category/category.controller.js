import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import categoryService from './category.service';
import Category from './category.model';

export default {
	async create(req, res) {
		try {
			const { value, error } = categoryService.validateCreateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const category = await Category.create(value);
			return res.json(category);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async findAll(req, res) {
		try {
			const categories = await Category.find();
			return res.json(categories);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async findOne(req, res) {
		try {
			const client = await Client.findById(req.params.id);
			if (!client) {
				return res.status(NOT_FOUND).json({ err: 'client not found' });
			}
			return res.json(client);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async delete(req, res) {
		try {
			const client = await Client.findOneAndRemove({ _id: req.params.id });
			if (!client) {
				return res.status(NOT_FOUND).json({ err: 'could not delete client' });
			}
			return res.json(client);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async update(req, res) {
		try {
			const { value, error } = clientService.validateUpdateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const client = await Client.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
			return res.json(client);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	}
};








// import Joi from 'joi';
// import HttpStatus from 'http-status-codes';
// import Category from './category.model';
// import categoryService from './category.service';

// export default {
// 	findAll(req, res, next) {
// 		const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
// 		const options = {
// 			page: parseInt(page, 10),
// 			limit: parseInt(perPage, 10),
		
// 		};

// 		const query = {};
// 		if (filter) {
// 			query.name = {
// 				$regex: filter
// 			};
// 		}

// 		if (sortField && sortDir) {
// 			options.sort = {
// 				[sortField]: sortDir
// 			};
// 		}

// 		Category.paginate(query, options)
// 			.then((categories) => res.json(categories))
// 			.catch(err => {
//             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
//         });
// 	},
// 	async findAllCatz(req, res) {
// 		try {
// 			const categories = await Category.find();
// 			return res.json(categories);
// 		} catch (err) {
// 			return res.status(INTERNAL_SERVER_ERROR).json(err);
// 		}
// 	},


// 	create(req, res, next) {
// 		const schema = Joi.object().keys({
// 			name: Joi.string().required()
// 		});
// 		const { error, value } = Joi.validate(req.body, schema);
// 		if (error && error.details) {
// 			return res.status(HttpStatus.BAD_REQUEST).json(error);
// 		}
// 		Category.create(value)
// 			.then((category) => res.json(category))
// 			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
// 	},
// 	findOne(req, res) {
// 		const { id } = req.params;
// 		Category.findById(id)
// 			.then((category) => {
// 				if (!category) {
// 					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any category' });
// 				}
// 				return res.json(category);
// 			})
// 			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
// 	},
// 	delete(req, res) {
// 		const { id } = req.params;
// 		Category.findByIdAndRemove(id)
// 			.then((category) => {
// 				if (!category) {
// 					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any category' });
// 				}
// 				return res.json(category);
// 			})
// 			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
// 	},
// 	update(req, res) {
// 		const { id } = req.params;
// 		const schema = Joi.object().keys({
// 			name: Joi.string().optional()
// 		});
// 		const { error, value } = Joi.validate(req.body, schema);
// 		if (error && error.details) {
// 			return res.status(HttpStatus.BAD_REQUEST).json(error);
// 		}
// 		Category.findOneAndUpdate({ _id: id }, value, { new: true })
// 			.then((category) => res.json(category))
// 			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
// 	}
// };
