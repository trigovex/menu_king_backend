//@ts-check
import express from 'express';
import CoreUserHandler from './handler.js';

const router = express.Router();
const coreUserHandler = new CoreUserHandler();

router.post('/core-users', (req, res) => coreUserHandler.createCoreUser(req, res));
router.put('/core-users/:id', (req, res) => coreUserHandler.upsertCoreUser(req, res));
router.patch('/core-users/:id', (req, res) => coreUserHandler.updateCoreUser(req, res));
router.delete('/core-users/:id', (req, res) => coreUserHandler.deleteCoreUser(req, res));
router.get('/core-users/:id', (req, res) => coreUserHandler.getCoreUser(req, res));
router.get('/core-users', (req, res) => coreUserHandler.listCoreUser(req, res));


// New routes for login, signup, and verify OTP
router.post('/auth/signup', (req, res) => coreUserHandler.signup(req, res));
router.post('/auth/login', (req, res) => coreUserHandler.login(req, res));
router.post('/auth/verify_otp', (req, res) => coreUserHandler.verifyOtp(req, res));


export default router;
