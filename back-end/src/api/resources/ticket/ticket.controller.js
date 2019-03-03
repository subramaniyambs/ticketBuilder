import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Ticket from './ticket.model';
import ticketService from './ticket.service';

const moment = require('moment');

const dateToStore = '2018-01-27 10:30';
const Date = moment(dateToStore, 'YYYY-MM-DD HH:mm');
// momentObject(2018-01-27T10:30:00.000)
export default {
	findAll(req, res, next) {
		const { page = 1, perPage = 10, sortField, sortDir, filter, serial, reception_date,clientName } = req.query;
		const options = {
			lean: true,
			page: parseInt(page, 10),
			limit: parseInt(perPage, 10),
			populate: 'client'

		};
		var query = {};
		// if (filter) {
		// 	query.id = {
		// 		$regex: filter
		// 	};
		// }
		if (clientName) {
			query.clientName = {
				$regex: clientName
			};
		}
		if (serial) {
			query.serial = {
				$regex: serial
			};
		}
		// if (reception_date) {
		// 	query.reception_date = {
		// 		$date: reception_date
		// 	};
		// }
		// {'states.cities._id':req.param('cityId')}
		// if(filtertype == "Model"){
		// 	if(searchData){
		// 		query.model = {
		// 			$regex: searchData
		// 		}
		// 	}
		// }
		if (sortField && sortDir) {
			options.sort = {
				[sortField]: sortDir
			};
		}
		if (reception_date) {
			query.reception_date = reception_date;
		}
		Ticket.paginate(query, options)
			.then((tickets) => {
				return res.json(tickets);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},



	async findAllTickets(req, res) {
		try {
			const tickets = await Ticket.find();
			return res.json(tickets);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	create(req, res, next) {
		const schema = Joi.object().keys({
			client: Joi.string().optional(),
			clientName: Joi.string().optional(),
			category: Joi.string().optional(),
			brand: Joi.string().optional(),
			model: Joi.string().optional(),
			task: Joi.array().optional(),
			missing: Joi.string().required(),
			reception_date: Joi.date().optional(),
			// reception_date: Joi.date('dd/MM/yyyy hh:mm').optional(),
			delivery_date: Joi.date().optional(),
			serial: Joi.string().optional(),
			usercode: Joi.string().optional(),
			price: Joi.number().integer().optional(),
			status: Joi.string().required(),
			coment: Joi.string().optional()

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
			client: Joi.string().optional(),
			clientName: Joi.string().optional(),
			category: Joi.string().optional(),
			brand: Joi.string().optional(),
			model: Joi.string().optional(),
			task: Joi.array().optional(),
			reception_date: Joi.date().optional(),
			delivery_date: Joi.date().optional(),
			missing: Joi.string().required(),
			serial: Joi.string().optional(),
			usercode: Joi.string().optional(),
			price: Joi.number().integer().optional(),
			status: Joi.string().required(),
			coment: Joi.string().optional()
		});

		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}

		Ticket.findOneAndUpdate({ _id: id }, value, { new: true })
			.then((ticket) => res.json(ticket))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},

	async download(req, res) {
		try {
			const { id } = req.params;
			const ticket = await Ticket.findById(id).populate('client');
			if (!ticket) {
				return res.status(NOT_FOUND).send({ err: 'could not find any ticket' });
			}

			const templateBody = ticketService.getTemplateBody(ticket);
			const html = ticketService.getTicketTemplate(templateBody);
			res.pdfFromHTML({
				filename: `${ticket.coment}.pdf`,
				htmlContent: html
			});
		} catch (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	}
};
