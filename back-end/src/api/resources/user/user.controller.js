import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from './user.service';
import User from './user.model';
import { devConfig } from '../../../config/env/development';

export default {
	async signup(req, res) {
		try {
		  const { error, value } = userService.validateSchema(req.body);
		  if (error && error.details) {
			return res.status(BAD_REQUEST).json(error);
		  }
		  const existingUser = await User.findOne({ 'local.email': value.email });
		  if (existingUser) {
			return res.status(BAD_REQUEST).json({ err: 'You have already created account' });
		  }
		  const user = await new User();
			  user.local.email = value.email;
			  const salt = await bcryptjs.genSalt();
			  const hash = await bcryptjs.hash(value.password, salt);
			  user.password = hash;
				user.name = value.name;
				user.phone = value.phone;
			  user.address = value.address;
			  
			  await user.save();
		  return res.json({ success: true, message: 'User created successfully' });
		} catch (err) {
		  console.error(err);
		  return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	  },
	  async login(req, res) {
		try {
		  const { error, value } = userService.validateSchema(req.body);
		  if (error && error.details) {
			return res.status(BAD_REQUEST).json(error);
		  }
		  const user = await User.findOne({ 'local.email': value.email });
		  if (!user) {
			return res.status(BAD_REQUEST).json({ err: 'invalid email or password' });
		  }
		  const matched = bcryptjs.compare(value.password, user.password);
		  if (!matched) {
			return res.status(UNAUTHORIZED).json({ err: 'invalid credentials' });
			}
		
		  const token = jwt.sign({ id: user._id }, devConfig.secret, {
			expiresIn: '1d',
		  });
		  return res.json({ success: true, token });
		} catch (err) {
		  console.error(err);
		  return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	  },
	  async test(req, res) {
		return res.json(req.currentUser);
		},
		

		findAll(req, res, next) {
			const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
			const options = {
				page: parseInt(page, 10),
				limit: parseInt(perPage, 10),
			
			};
			const query = {};
			if (filter) {
				query.item = {
					$regex: filter
				};
			}
	
			if (sortField && sortDir) {
				options.sort = {
					[sortField]: sortDir
				};
			}
	
			console.log(options);
			User.paginate(query, options)
				.then((users) => res.json(users))
				.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
		},


	async create(req, res) {
			try {
			  const { error, value } = userService.validateSchema(req.body);
			  if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			  }
			  const existingUser = await User.findOne({ 'local.email': value.email });
			  if (existingUser) {
				return res.status(BAD_REQUEST).json({ err: 'You have already created account' });
			  }
			  const user = await new User();
			  user.local.email = value.email;
			  const salt = await bcryptjs.genSalt();
			  const hash = await bcryptjs.hash(value.password, salt);
			  user.password = hash;
				user.name = value.name;
				user.phone = value.phone;
			  user.address = value.address;
			  
			  await user.save();
			  return res.json({ success: true, message: 'User created successfully' });
			} catch (err) {
			  console.error(err);
			  return res.status(INTERNAL_SERVER_ERROR).json(err);
			}
		  },
	
	async findAll(req, res) {
		try {
			const users = await User.find();
			return res.json(users);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	findOne(req, res) {
		const { id } = req.params;
		User.findById(id)
			.populate('client')
			.then((user) => {
				if (!user) {
					return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any user' });
				}
				return res.json(user);
			})
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},
	async delete(req, res) {
		try {
			const user = await User.findOneAndRemove({ _id: req.params.id });
			if (!user) {
				return res.status(NOT_FOUND).json({ err: 'could not delete user' });
			}
			return res.json(user);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	// async update(req, res) {
	// 	try {
	// 		const { value, error } = userService.validateUpdateSchema(req.body);
	// 		if (error && error.details) {
	// 			return res.status(BAD_REQUEST).json(error);
	// 		}
	// 		const user = await User.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
	// 		return res.json(user);
	// 	} catch (err) {
	// 		return res.status(INTERNAL_SERVER_ERROR).json(err);
	// 	}
	// }
	async update(req, res) {
		let { id } = req.params;
		const schema = Joi.object().keys({
			email: Joi.string().optional(),
			password: Joi.string().optional(),
			name: Joi.string().optional(),
			phone: Joi.string().optional(),
			address: Joi.string().optional(),
		
		});
		const { error, value } = Joi.validate(req.body, schema);
		if (error && error.details) {
			return res.status(HttpStatus.BAD_REQUEST).json(error);
		}
		User.findOneAndUpdate({ _id: id }, value, { new: true })
			.then((user) => res.json(user))
			.catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
	},		
};
