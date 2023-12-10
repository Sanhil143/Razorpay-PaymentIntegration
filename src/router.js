import * as express from 'express'
import {paymentCheckout,paymentVerification} from './razorpayController'
const router = express.Router();



router.post('/paymentCheckout',paymentCheckout)
router.post('/paymentCheckout',paymentVerification)