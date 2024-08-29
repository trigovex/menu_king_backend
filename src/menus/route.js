//@ts-check
import express from 'express';
import MenuHandler from './handler.js';

const router = express.Router();
const menuHandler = new MenuHandler();

// Route to create a new menu
router.post('/menus', (req, res) => menuHandler.createMenu(req, res));

// Route to upsert (insert or update) a menu
router.put('/menus/:id', (req, res) => menuHandler.upsertMenu(req, res));

// Route to update an existing menu
router.patch('/menus/:id', (req, res) => menuHandler.updateMenu(req, res));

// Route to delete a menu
router.delete('/menus/:id', (req, res) => menuHandler.deleteMenu(req, res));

// Route to get a single menu
router.get('/menus/:id', (req, res) => menuHandler.getMenu(req, res));

// Route to list menus with pagination and sorting
router.get('/menus', (req, res) => menuHandler.listMenu(req, res));

export default router;
