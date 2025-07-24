import express from 'express'
import * as CurrencyController from '../controllers/currencyController.js'

const router = express.Router()

router.get('/', CurrencyController.listCurrencies)
router.post('/', CurrencyController.createCurrency)
router.get('/:code', CurrencyController.getCurrency)
router.put('/:code', CurrencyController.updateCurrency)
router.delete('/:code', CurrencyController.deleteCurrency)

export default router
