import express from 'express';
import { invoiceRouter } from './resources/invoice';
import { ticketRouter } from './resources/ticket';
import { clientRouter } from './resources/client';
import { categoryRouter } from './resources/category';
import { brandRouter } from './resources/brand';
import { missingRouter } from './resources/missing';
import { modelRouter } from './resources/model';
import { taskRouter } from './resources/task';
import { userRouter } from './resources/user';
import { repairRouter } from './resources/repairs';
import { authRouter } from './resources/auth';


export const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);
restRouter.use('/tickets', ticketRouter);
restRouter.use('/categories', categoryRouter);
restRouter.use('/brands', brandRouter);
restRouter.use('/tasks', taskRouter);
restRouter.use('/models', modelRouter);
restRouter.use('/missings', modelRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/users', userRouter);
restRouter.use('/repairs', repairRouter);
restRouter.use('/auth', authRouter);
