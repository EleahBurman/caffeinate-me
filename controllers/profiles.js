import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render('profiles/index', {
        title: 'All Profiles',
        profiles: profiles,
        nav: 'profiles',
        userProfile
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .populate('cafes')
  .then(profile => {
    res.render('profiles/show', {
      // Set the title of the page to the profile name
      title: profile.name,
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function requestFriend(req, res) {
  // find the logged in user's profile _id
  Profile.findById(req.user.profile)
  .then(userProfile => {
    // push the friend _id into the pendingOutgoing
    userProfile.pendingOutgoingInvites.push(req.params.profileId)
    userProfile.save()
    .then(() => {
      // find the friend profile
      Profile.findById(req.params.profileId)
      .then(friendProfile => {
        // push the logged in user's profile _id into pendingIncoming
        friendProfile.pendingIncomingInvites.push(req.user.profile)
        friendProfile.save()
        .then(() => {
          res.redirect('/profiles')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/profiles')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function acceptFriend(req, res) {
  // find the logged in user's profile
  Profile.findById(req.user.profile)
  .then(userProfile => {
    // remove the friend _id from pending incoming
    userProfile.pendingIncomingInvites.remove(req.params.profileId)
    // add friend _id to friends list
    userProfile.friends.push(req.params.profileId)
    userProfile.save()
    .then(() => {
      // find the friend profile
      Profile.findById(req.params.profileId)
      .then(friendProfile => {
        // remove the logged in user's profile _id from pending outgoing
        friendProfile.pendingOutgoingInvites.remove({_id: req.user.profile._id})
        // add to friends
        friendProfile.friends.push(req.user.profile)
        friendProfile.save()
        .then(() => {
          res.redirect('/profiles')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/profiles')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function removeFriend(req, res) {
  // find the logged in user's profile
  Profile.findById(req.user.profile)
  .then(userProfile => {
    // remove the friend _id from the friends array
    userProfile.friends.remove(req.params.profileId)
    userProfile.save()
    .then(() => {
      // find the friend profile
        // remove the logged in user's _id from friends array
      Profile.findById(req.params.profileId)
      .then(friendProfile => {
        friendProfile.friends.remove(req.user.profile)
        friendProfile.save()
        .then(() => {
          res.redirect('/profiles')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/profiles')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
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
  requestFriend,
  acceptFriend,
  removeFriend
}