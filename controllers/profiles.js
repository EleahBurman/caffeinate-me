import { Profile } from "../models/profile.js"
function index(req, res) {
  Profile.find({})
  .then(profiles => {
    //I want a view of my profiles/index
    res.render('profiles/index')
    // {
    //   profiles: profiles,
    //   title: 'All Profiles'
    // })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}
function show(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
      res.render('profiles/show') 
    //   {
    //     profile: profile,
    //     title: 'My Profile'
    //   });
    // })
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