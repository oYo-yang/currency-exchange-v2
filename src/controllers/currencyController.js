import * as CurrencyModel from '../models/currencyModel.js'

export async function listCurrencies(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 20
    const offset = parseInt(req.query.offset) || 0
    const currencies = await CurrencyModel.getAllCurrencies(limit, offset)
    res.json(currencies)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getCurrency(req, res) {
  try {
    const { code } = req.params
    const currency = await CurrencyModel.getCurrencyByCode(code)
    if (!currency) return res.status(404).json({ error: 'Currency not found' })
    res.json(currency)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createCurrency(req, res) {
  try {
    const { code, name, symbol, country } = req.body
    if (!code || !name || !symbol || !country) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    await CurrencyModel.createCurrency({ code, name, symbol, country })
    res.status(201).json({ message: 'Currency created' })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Currency code already exists' })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
}

export async function updateCurrency(req, res) {
  try {
    const { code } = req.params
    const { name, country } = req.body
    const result = await CurrencyModel.updateCurrency(code, { name, country })
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Currency not found' })
    res.json({ message: 'Currency updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteCurrency(req, res) {
  try {
    const { code } = req.params
    const result = await CurrencyModel.deleteCurrency(code)
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Currency not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
