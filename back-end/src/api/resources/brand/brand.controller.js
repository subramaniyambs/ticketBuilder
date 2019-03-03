import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import brandService from './brand.service';
import Brand from './brand.model';

export default {
	async findBrands(req, res) {
		try {
			const brands = await Brand.find();
			return res.json(brands);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},

	async create(req, res) {
		try {
			const { value, error } = brandService.validateCreateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const brand = await Brand.create(value);
			return res.json(brand);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	// async findAll(req, res) {
	// 	try {
	// 		const brands = await Brand.find();
	// 		return res.json(brands);
	// 	} catch (err) {
	// 		return res.status(INTERNAL_SERVER_ERROR).json(err);
	// 	}
	// },
	async findOne(req, res) {
		try {
			const brand = await Brand.findById(req.params.id);
			if (!brand) {
				return res.status(NOT_FOUND).json({ err: 'brand not found' });
			}
			return res.json(brand);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async delete(req, res) {
		try {
			const brand = await Brand.findOneAndRemove({ _id: req.params.id });
			if (!brand) {
				return res.status(NOT_FOUND).json({ err: 'could not delete brand' });
			}
			return res.json(brand);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async update(req, res) {
		try {
			const { value, error } = brandService.validateUpdateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const brand = await Brand.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
			return res.json(brand);
		} catch (err) {
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	
};
