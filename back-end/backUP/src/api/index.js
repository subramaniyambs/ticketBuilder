import express from 'express';
import { invoiceRouter } from './resources/invoice';
import { ticketRouter } from './resources/ticket';
import { clientRouter } from './resources/client';
import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';

export const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);
restRouter.use('/tickets', ticketRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/users', userRouter);
restRouter.use('/auth', authRouter);
