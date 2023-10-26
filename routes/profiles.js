import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router ()

//GET localhost: 3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
//read a specific blog - blogs/blogid
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
router.post('/requestFriend/:profileId', isLoggedIn, profilesCtrl.requestFriend)
router.patch('/acceptFriend/:profileId', isLoggedIn, profilesCtrl.acceptFriend)
router.delete('/removeFriend/:profileId', isLoggedIn, profilesCtrl.removeFriend)
router.post('/:profileId/addGif', isLoggedIn, profilesCtrl.addGif);
router.post('/:profileId/clearGifs', isLoggedIn, profilesCtrl.clearGifs);
router.post('/:profileId/removeOneGif', isLoggedIn, profilesCtrl.removeOneGif);
router.post('/:profileId/updateBackgroundColor', isLoggedIn, profilesCtrl.updateBackgroundColor);


export { router }