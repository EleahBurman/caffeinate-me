import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()

//GET localhost: 3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
//read a specific blog - blogs/blogid
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// /blogs/:blogId/subscribers/:subscriberId
router.post('/:profileId/cafes/:cafeId', isLoggedIn, profilesCtrl.favCafes)
export { router }