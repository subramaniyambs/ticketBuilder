import express from 'express';
import passport from 'passport';
import taskController from './task.controller';

export const taskRouter = express.Router();

taskRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), taskController.create)
	.get(passport.authenticate('jwt', { session: false }), taskController.findTasks);

taskRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), taskController.update)
	.delete(passport.authenticate('jwt', { session: false }), taskController.delete)
	.get(passport.authenticate('jwt', { session: false }), taskController.findOne);
