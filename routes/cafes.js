import { Router } from 'express'
import * as cafesCtrl from '../controllers/cafes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()
// GET localhost:3000/cafes
router.get('/', cafesCtrl.index)
// GET localhost:3000/cafes/new
router.get('/new', cafesCtrl.new)
// GET localhost:3000/cafes/:cafeId
router.get('/:cafeId', cafesCtrl.show)
// POST localhost:3000/cafes
router.post('/', isLoggedIn, cafesCtrl.create)
// POST localhost:3000/cafes/:cafeId/reviews
router.post('/:cafeId/reviews', cafesCtrl.createReview)
// DELETE localhost:3000/cafes/:cafeId
router.delete('/:cafeId', cafesCtrl.delete )
// PUT localhost:3000/cafes/:cafeId
router.put('/:cafeId', isLoggedIn, cafesCtrl.update)
export { router }