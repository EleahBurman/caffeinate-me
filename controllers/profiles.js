import { Profile } from "../models/profile.js"
function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
    profiles: profiles,
    title: 'All Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}
function show(req, res) {
  Profile.findById(req.params.profileId)
  //referenced resource, cafes, is populated
  .populate('cafes')
    .then(profile => {
      res.render('profiles/show', {
        // Set the title of the page to the profile name
        title: profile.name,
        // Pass the retrieved profile object to the view
        profile
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
}

export {
  index,
  show,
}