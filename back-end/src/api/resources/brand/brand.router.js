import express from 'express';
import passport from 'passport';
import brandController from './brand.controller';

export const brandRouter = express.Router();

brandRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), brandController.create)
	.get(passport.authenticate('jwt', { session: false }), brandController.findBrands);


brandRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), brandController.update)
	.delete(passport.authenticate('jwt', { session: false }), brandController.delete)
	.get(passport.authenticate('jwt', { session: false }), brandController.findOne);

