import express from 'express';
import invoiceController from '../api/controllers/invoice.controller';

import categoryController from '../api/controllers/category.controller';


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

// categories
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findOne);
router.delete('/categories/:id', categoryController.delete);
router.put('/categories/:id', categoryController.update);
router.post('/categories', categoryController.create);

// brands
router.get('/brands', brandController.findAll);
router.get('/brands/:id', brandController.findOne);
router.delete('/brands/:id', brandController.delete);
router.put('/brands/:id', brandController.update);
router.post('/brands', brandController.create);

// tasks
router.get('/tasks', taskController.findAll);
router.get('/tasks/:id', taskController.findOne);
router.delete('/tasks/:id', taskController.delete);
router.put('/tasks/:id', taskController.update);
router.post('/tasks', taskController.create);

// Model
router.get('/models', modelController.findAll);
router.get('/models/:id', modelController.findOne);
router.delete('/models/:id', modelController.delete);
router.put('/models/:id', modelController.update);
router.post('/models', modelController.create);

// Model
router.get('/repairs', modelController.findAll);
router.get('/repairs/:id', modelController.findOne);
router.delete('/repairs/:id', modelController.delete);
router.put('/repairs/:id', modelController.update);
router.post('/repairs', modelController.create);

// Missing
router.get('/missings', modelController.findAll);
router.get('/missings/:id', modelController.findOne);
router.delete('/missings/:id', modelController.delete);
router.put('/missings/:id', modelController.update);
router.post('/missings', modelController.create);

// User
router.get('/users', modelController.findAll);
router.get('/users/:id', modelController.findOne);
router.delete('/users/:id', modelController.delete);
router.put('/users/:id', modelController.update);
router.post('/users', modelController.create);
