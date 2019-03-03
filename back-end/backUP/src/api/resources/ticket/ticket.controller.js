import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Ticket from './ticket.model';
import ticketService from './ticket.service';

export default {
	findAll(req, res, next) {
		const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
		const options = {
			page: parseInt(page, 10),
			limit: parseInt(perPage, 10),
			populate: 'client'
		};
		const query = {};
		if (filter) {
			query.category = {
				$regex: filter
			};
		}
		if (sortField && sortDir) {
			options.sort = {
				[sortField]: sortDir
			};
		}
		console.log(options);
		Ticket.paginate(query, options)
			.then((tickets) => res.json(tickets))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	create(req, res, next) {
		const schema = Joi.object().keys({
			category: Joi.string().required(),
			brand: Joi.string().required(),
			model: Joi.string().required(),
			task: Joi.string().required(),
			missing: Joi.string().required(),
			serial: Joi.string().optional(),
			usercode: Joi.string().optional(),
			price: Joi.number().integer().optional(),
			status: Joi.string().required(),
			reception_date: Joi.date().required(),
			delivery_date: Joi.date().required(),
			coment: Joi.date().optional(),
			client: Joi.string().optional()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Ticket.create(value)
			.then((ticket) => res.json(ticket))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	findOne(req, res) {
		const { id } = req.params;
		Ticket.findById(id)
			.populate('client')
			.then((ticket) => {
				if (!ticket) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any ticket' });
				}
				return res.json(ticket);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	delete(req, res) {
		const { id } = req.params;
		Ticket.findByIdAndRemove(id)
			.then((ticket) => {
				if (!ticket) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any ticket' });
				}
				return res.json(ticket);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	update(req, res) {
		const { id } = req.params;
		const schema = Joi.object().keys({
			category: Joi.string().optional(),
			brand: Joi.string().optional(),
			model: Joi.string().optional(),
			task: Joi.string().optional(),
			missing: Joi.string().optional(),
			serial: Joi.string().optional(),
			usercode: Joi.string().optional(),
			price: Joi.number().integer().optional(),
			status: Joi.string().required(),
			reception_date: Joi.date().optional(),
			delivery_date: Joi.date().optional(),
			coment: Joi.date().optional(),
			client: Joi.string().optional()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Ticket.findOneAndUpdate({ _id: id }, value, { new: true })
			.then((ticket) => res.json(ticket))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	}
};
