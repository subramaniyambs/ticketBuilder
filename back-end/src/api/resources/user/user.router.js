import express from 'express';
import passport from 'passport';
import userController from './user.controller';

export const userRouter = express.Router();
 userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/test', passport.authenticate('jwt', { session: false }), userController.test);


userRouter
	.route('/')
    .post(passport.authenticate('jwt', { session: false }), userController.create)
    .put(passport.authenticate('jwt', { session: false }), userController.update)
	.get(passport.authenticate('jwt', { session: false }), userController.findAll);
userRouter
	.route('/:id')
	
    .get(passport.authenticate('jwt', { session: false }), userController.findOne)
    .delete(passport.authenticate('jwt', { session: false }), userController.delete);
    
    
    