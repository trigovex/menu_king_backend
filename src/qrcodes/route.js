//@ts-check
import express from 'express';
import QRCodeHandler from './handler.js';

const router = express.Router();
const qrCodeHandler = new QRCodeHandler();

// Route to create a new QR code
router.post('/qr_codes', (req, res) => qrCodeHandler.createQRCode(req, res));

// Route to upsert (insert or update) a QR code
router.put('/qr_codes/:id', (req, res) => qrCodeHandler.upsertQRCode(req, res));

// Route to update an existing QR code
router.patch('/qr_codes/:id', (req, res) => qrCodeHandler.updateQRCode(req, res));

// Route to delete a QR code
router.delete('/qr_codes/:id', (req, res) => qrCodeHandler.deleteQRCode(req, res));

// Route to get a single QR code
router.get('/qr_codes/:id', (req, res) => qrCodeHandler.getQRCode(req, res));

// Route to list QR codes with pagination and sorting
router.get('/qr_codes', (req, res) => qrCodeHandler.listQRCode(req, res));

export default router;
