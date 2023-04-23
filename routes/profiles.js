import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()

//GET localhost: 3000/profiles
router.get('/', profilesCtrl.index)
//read a specific blog
router.get('/:profileId', isLoggedIn, profilesCtrl.show)

export { router }