import * as WatchlistModel from '../models/watchlistModel.js'

export async function listWatchlists(req, res) {
  try {
    const watchlists = await WatchlistModel.getAllWatchlists()
    res.json(watchlists)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createWatchlist(req, res) {
  try {
    const { userId, currencies } = req.body
    if (!userId || !currencies) return res.status(400).json({ error: 'Missing fields' })
    await WatchlistModel.createWatchlist({ userId, currencies })
    res.status(201).json({ message: 'Watchlist created' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getWatchlist(req, res) {
  try {
    const { id } = req.params
    const watchlist = await WatchlistModel.getWatchlistById(id)
    if (!watchlist) return res.status(404).json({ error: 'Watchlist not found' })
    res.json(watchlist)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateWatchlist(req, res) {
  try {
    const { id } = req.params
    const { currencies } = req.body
    const result = await WatchlistModel.updateWatchlist(id, { currencies })
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Watchlist not found' })
    res.json({ message: 'Watchlist updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteWatchlist(req, res) {
  try {
    const { id } = req.params
    const result = await WatchlistModel.deleteWatchlist(id)
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Watchlist not found' })
    res.json({ message: 'Watchlist deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function searchWatchlists(req, res) {
  try {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ error: 'Missing userId' })
    const watchlists = await WatchlistModel.searchWatchlistsByUserId(userId)
    res.json(watchlists)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
