import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Task from './task.model';
import taskService from './task.service';

export default {
	
	async findTasks(req, res) {
		try {
			const tasks = await Task.find();
			return res.json(tasks);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
		
	create(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().required()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Task.create(value)
			.then((task) => res.json(task))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	findOne(req, res) {
		const { id } = req.params;
		Task.findById(id)
			.then((task) => {
				if (!task) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any task' });
				}
				return res.json(task);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	delete(req, res) {
		const { id } = req.params;
		Task.findByIdAndRemove(id)
			.then((task) => {
				if (!task) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any task' });
				}
				return res.json(task);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	update(req, res) {
		const { id } = req.params;
		const schema = Joi.object().keys({
			name: Joi.string().optional()
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		Task.findOneAndUpdate({ _id: id }, value, { new: true })
			.then((task) => res.json(task))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	}
};
