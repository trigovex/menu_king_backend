//@ts-check
import express from 'express';

// Import route files
import coreUserRoutes from './core_user/route.js';
import restaurantRoutes from './restautants/route.js';
import orderRoutes from './orders/route.js';
import menuRoutes from './menus/route.js';
import subscriptionRoutes from './subscriptions/route.js';
import qr_codes from './qrcodes/route.js';
import AxiosHandler from './handler.js';
 const service = new AxiosHandler()
const router = express.Router();

// Use routes with appropriate paths
router.use('', coreUserRoutes);
router.use('', restaurantRoutes);
router.use('', orderRoutes);
router.use('', menuRoutes);
router.use('', subscriptionRoutes);
router.use('', qr_codes);
router.use('/menu_king',service.makeRequest)
export default router;
