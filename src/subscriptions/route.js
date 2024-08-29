//@ts-check
import express from 'express';
import SubscriptionHandler from './handler.js';

const router = express.Router();
const subscriptionHandler = new SubscriptionHandler();

// Route to create a new subscription
router.post('/subscriptions', (req, res) => subscriptionHandler.createSubscription(req, res));

// Route to upsert (insert or update) a subscription
router.put('/subscriptions/:id', (req, res) => subscriptionHandler.upsertSubscription(req, res));

// Route to update an existing subscription
router.patch('/subscriptions/:id', (req, res) => subscriptionHandler.updateSubscription(req, res));

// Route to delete a subscription
router.delete('/subscriptions/:id', (req, res) => subscriptionHandler.deleteSubscription(req, res));

// Route to get a single subscription
router.get('/subscriptions/:id', (req, res) => subscriptionHandler.getSubscription(req, res));

// Route to list subscriptions with pagination and sorting
router.get('/subscriptions', (req, res) => subscriptionHandler.listSubscription(req, res));

export default router;
