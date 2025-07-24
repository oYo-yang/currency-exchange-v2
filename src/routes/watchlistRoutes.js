import express from 'express'
import * as WatchlistController from '../controllers/watchlistController.js'

const router = express.Router()

router.get('/', WatchlistController.listWatchlists)
router.post('/', WatchlistController.createWatchlist)
router.get('/search', WatchlistController.searchWatchlists)
router.get('/:id', WatchlistController.getWatchlist)
router.put('/:id', WatchlistController.updateWatchlist)
router.delete('/:id', WatchlistController.deleteWatchlist)

export default router
