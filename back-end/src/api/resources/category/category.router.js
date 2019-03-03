import express from 'express';
import passport from 'passport';
import categoryController from './category.controller';

export const categoryRouter = express.Router();

categoryRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), categoryController.create)
	.get(passport.authenticate('jwt', { session: false }), categoryController.findAll);

categoryRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), categoryController.update)
	.delete(passport.authenticate('jwt', { session: false }), categoryController.delete)
	.get(passport.authenticate('jwt', { session: false }), categoryController.findOne);
