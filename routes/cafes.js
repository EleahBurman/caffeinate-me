import { Router } from 'express'
import * as cafesCtrl from '../controllers/cafes.js'

const router = Router ()
// GET localhost:3000/cafes
router.get('/', cafesCtrl.index)
// GET localhost:3000/cafes/new
router.get('/new', cafesCtrl.new)

export { router }