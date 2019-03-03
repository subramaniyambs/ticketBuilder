import express from 'express';
import passport from 'passport';
import ticketController from './ticket.controller';

export const ticketRouter = express.Router();

ticketRouter
	.route('/')
	.post(passport.authenticate('jwt', { session: false }), ticketController.create)
	.get(passport.authenticate('jwt', { session: false }), ticketController.findAll)
	.get(passport.authenticate('jwt', { session: false }), ticketController.findAllTickets);

ticketRouter
	.route('/:id')
	.put(passport.authenticate('jwt', { session: false }), ticketController.update)
	.delete(passport.authenticate('jwt', { session: false }), ticketController.delete)
	.get(passport.authenticate('jwt', { session: false }), ticketController.findOne);
ticketRouter.get('/:id/download', passport.authenticate('jwt', { session: false }), ticketController.download);
