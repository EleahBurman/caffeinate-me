import { Profile } from "../models/profile.js"
import { User } from '../models/user.js'

function index(req, res) {
  //find all profiles
  Profile.find({})
  //populate the user field
  .populate('user')
  //finds users own profile
  .then(profiles => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render('profiles/index', {
        profiles,
        userProfile,
        title: 'profile'
      })
    })
  })
}

function show(req, res) {
   // find the logged in user's profile _id
  Profile.findById(req.params.profileId)
  .then(profile => {
    res.render('profiles/show', {
      profile
    })
  })
}

export {
  index,
  show
}