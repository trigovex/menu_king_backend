//@ts-check
import express from 'express';
import OrderHandler from './handler.js';

const router = express.Router();
const orderHandler = new OrderHandler();

// Route to create a new order
router.post('/orders', (req, res) => orderHandler.createOrder(req, res));

// Route to upsert (insert or update) an order
router.put('/orders/:id', (req, res) => orderHandler.upsertOrder(req, res));

// Route to update an existing order
router.patch('/orders/:id', (req, res) => orderHandler.updateOrder(req, res));

// Route to delete an order
router.delete('/orders/:id', (req, res) => orderHandler.deleteOrder(req, res));

// Route to get a single order
router.get('/orders/:id', (req, res) => orderHandler.getOrder(req, res));

// Route to list orders with pagination and sorting
router.get('/orders', (req, res) => orderHandler.listOrder(req, res));

export default router;
