import { Profile } from "../models/profile.js"
function index(req, res) {
  Profile.find({})
  .then(profiles => {
    //I want a view of my profiles/index
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
    .then(profile => {
      res.render('profiles/show', {
        // Pass the retrieved profile object to the view
        profile: profile, 
        // Set the title of the page to the profile name
        title: profile.name
      });
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
}

export {
  index,
  show
}