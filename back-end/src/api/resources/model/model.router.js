import express from 'express';
import passport from 'passport';
import modelController from './model.controller';

export const modelRouter = express.Router();
modelRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), modelController.create)
	.get(passport.authenticate('jwt', { session: false }), modelController.findModels);

modelRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), modelController.update)
	.delete(passport.authenticate('jwt', { session: false }), modelController.delete)
	// .get(passport.authenticate('jwt', { session: false }), modelController.findOne)
	.get(passport.authenticate('jwt', { session: false }), modelController.findByBrand);

