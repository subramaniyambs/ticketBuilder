import express from 'express';
import invoiceController from '../api/controllers/invoice.controller';

export const router = express.Router();

// Invoices
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);
// tickets
router.get('/tickets', ticketController.findAll);
router.get('/tickets/:id', ticketController.findOne);
router.delete('/tickets/:id', ticketController.delete);
router.put('/tickets/:id', ticketController.update);
router.post('/tickets', ticketController.create);
