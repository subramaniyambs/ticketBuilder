import express from 'express';
import passport from 'passport';
import missingController from './missing.controller';

export const missingRouter = express.Router();

missingRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), missingController.create)
	.get(passport.authenticate('jwt', { session: false }), missingController.findAll);

missingRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), missingController.update)
	.delete(passport.authenticate('jwt', { session: false }), missingController.delete)
	.get(passport.authenticate('jwt', { session: false }), missingController.findOne);
