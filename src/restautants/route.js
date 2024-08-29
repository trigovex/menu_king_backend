//@ts-check
import express from 'express';
import RestaurantHandler from './handler.js';

const router = express.Router();
const restaurantHandler = new RestaurantHandler();

// Route to create a new restaurant
router.post('/restaurants', (req, res) => restaurantHandler.createRestaurant(req, res));

// Route to upsert (insert or update) a restaurant
router.put('/restaurants/:id', (req, res) => restaurantHandler.upsertRestaurant(req, res));

// Route to update an existing restaurant
router.patch('/restaurants/:id', (req, res) => restaurantHandler.updateRestaurant(req, res));

// Route to delete a restaurant
router.delete('/restaurants/:id', (req, res) => restaurantHandler.deleteRestaurant(req, res));

// Route to get a single restaurant
router.get('/restaurants/:id', (req, res) => restaurantHandler.getRestaurant(req, res));

// Route to list restaurants with pagination and sorting
router.get('/restaurants', (req, res) => restaurantHandler.listRestaurant(req, res));

export default router;
