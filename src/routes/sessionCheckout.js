import express from 'express';
import { createCheckoutSession } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

router.get('/success', (req, res) => {
    res.send('Payment successful');
});

router.get('/cancel', (req, res) => {
    res.redirect(`/pages/index.html`);
});

export default router;