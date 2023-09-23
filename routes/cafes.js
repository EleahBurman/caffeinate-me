import { Router } from 'express'
import * as cafesCtrl from '../controllers/cafes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()
// GET localhost:3000/cafes
router.get('/', isLoggedIn, cafesCtrl.index)
// GET localhost:3000/cafes/new
router.get('/new', isLoggedIn, cafesCtrl.new)
// GET localhost:3000/cafes/:cafeId
router.get('/:cafeId', isLoggedIn, cafesCtrl.show)
// blogs/:blogId/comments/:commentId
router.get('/:cafeId/reviews/:reviewId/edit', isLoggedIn,  cafesCtrl.editReview)
// POST localhost:3000/cafes
router.post('/', isLoggedIn, cafesCtrl.create)
// POST localhost:3000/cafes/:cafeId/reviews
router.post('/:cafeId/reviews', isLoggedIn,cafesCtrl.createReview)
// DELETE localhost:3000/cafes/:cafeId
router.delete('/:cafeId', isLoggedIn, cafesCtrl.delete )
// DELTE localhost:3000/cafes/:cafeId/reviews/:reviewId
router.delete('/:cafeId/reviews/:reviewId', isLoggedIn, cafesCtrl.deleteReview)
// PUT localhost:3000/cafes/:cafeId
router.put('/:cafeId', isLoggedIn, cafesCtrl.update)
// PUT localhost:3000/blogs/:blogId/comments/:commentId
router.put('/:cafeId/reviews/:reviewId', isLoggedIn, cafesCtrl.updateReview)
export { router }