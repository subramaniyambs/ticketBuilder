import express from 'express';
import passport from 'passport';
import repairController from './repairController';


export const repairRouter = express.Router();


repairRouter
	.route('/')
    .get(passport.authenticate('jwt', { session: false }), repairController.findAll)
    .post(passport.authenticate('jwt', { session: false }), repairController.create);
    // .put(passport.authenticate('jwt', { session: false }), repairController.update)
    

    // repairRouter
	// .route('/:id')
	
    // .get(passport.authenticate('jwt', { session: false }), repairController.findOne)
    // .delete(passport.authenticate('jwt', { session: false }), repairController.delete);
    
    