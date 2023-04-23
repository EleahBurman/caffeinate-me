import { Router } from 'express'
import * as cafesCtrl from '../controllers/cafes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()
// GET localhost:3000/cafes
router.get('/', cafesCtrl.index)
// GET localhost:3000/cafes/new
router.get('/new', cafesCtrl.new)
// POST localhost:3000/cafes
router.post('/', isLoggedIn, cafesCtrl.create)
// PUT localhost:3000/cafes/:cafeId
router.put('/:cafeId', cafesCtrl.update)
export { router }