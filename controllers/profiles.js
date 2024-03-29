import { Profile } from "../models/profile.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use fileURLToPath to get the current module's filename
const __filename = fileURLToPath(import.meta.url);

// Derive the directory name from the filename
const __dirname = path.dirname(__filename);

// Load the list of available GIFs from the folder
const availableGifs = getAvailableGifs(__dirname);

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render('profiles/index', {
        title: 'All Profiles',
        profiles: profiles,
        nav: 'profiles',
        userProfile,
        availableGifs,
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

// Helper function to get available GIFs
function getAvailableGifs(dirname) {
  const gifFilesPath = path.join(dirname, '../public/images/available-gifs');
  const gifFiles = fs.readdirSync(gifFilesPath);
  return gifFiles.map(file => file.replace('.gif', ''));
}

function show(req, res) {
  const profileId = req.params.profileId;
  Profile.findById(profileId)
    .populate('cafes')
    .then(profile => {
      Profile.findById(req.user.profile)
        .then(userProfile => {
          // Specify the path to the folder containing the available GIFs
          const gifsFolder = path.join(__dirname, '../public/images/available-gifs');

          // Read the files in the folder to get the list of available GIFs
          fs.readdir(gifsFolder, (err, files) => {
            if (err) {
              console.error(err);
              res.redirect('/profiles');
              return;
            }

            // Filter the files to include only GIFs
            const availableGifs = files.filter(file => file.endsWith('.gif'));

            res.render('profiles/show', {
              title: profile.name,
              profile,
              userProfile,
              availableGifs,
              gifIndex: req.params.gifIndex, // Pass gifIndex to the template
            });
          });
        })
        .catch(err => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/profiles');
    });
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

function addGif(req, res) {
  // Assuming the user is logged in and you have access to their profile ID
  Profile.findById(req.user.profile)
    .then(userProfile => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      // Fetch the selectedGif from the request body
      const selectedGif = req.body.selectedGif;

      // Construct the file path to the selected GIF
      const gifPath = `/images/available-gifs/${selectedGif}`;

      // Save the selected GIF to the user's profile
      userProfile.gifs.push(gifPath);

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect('/profiles'); // Redirect to the user's profile page
        })
        .catch(err => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/profiles');
    });
}

function removeOneGif(req, res) {
  // Find the user profile and check if the user has permission
  Profile.findById(req.params.profileId)
    .then((userProfile) => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      if (!userProfile.equals(req.user.profile)) {
        console.error('User does not have permission to clear GIFs');
        return res.redirect('/profiles');
      }

      // Get the gifPath to remove from the query parameters
      const gifPathToRemove = req.query.gifPath;

      // Remove the specified gifPath from the userProfile.gifs array
      userProfile.gifs = userProfile.gifs.filter(gifPath => gifPath !== gifPathToRemove);

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect('/profiles'); // Redirect to the user's profile page
        })
        .catch((err) => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/profiles');
    });
}

function clearGifs(req, res) {
  Profile.findById(req.params.profileId)
    .then((userProfile) => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      // Clear all GIFs by setting the userProfile.gifs to an empty array
      userProfile.gifs = [];

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect('/profiles'); // Redirect to the user's profile page
        })
        .catch((err) => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/profiles');
    });
}


function updateBackgroundColor(req, res) {
  // Find the user's profile
  Profile.findById(req.params.profileId)
    .then(userProfile => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      // Get the selected background color from the request body
      const backgroundColor = req.body.backgroundColor;

      // Update the user's profile with the new background color
      userProfile.backgroundColor = backgroundColor;

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect(`/profiles/${req.params.profileId}`);
        })
        .catch(err => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/profiles');
    });
}

function updateBio(req, res) {
  const profileId = req.params.profileId;

  // Find the user's profile by ID
  Profile.findById(profileId)
    .then(userProfile => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      // Get the bio from the request body
      const newBio = req.body.bio;

      // Check if the user already has a bio
      if (userProfile.bio) {
        // If a bio already exists, update it
        userProfile.bio = newBio;
      } else {
        // If no bio exists, create a new one
        userProfile.bio = newBio;
      }

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect(`/profiles/${profileId}`);
        })
        .catch(err => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/profiles');
    });
}

function deleteBio(req, res) {
  const profileId = req.params.profileId;

  // Find the user's profile by ID
  Profile.findById(profileId)
    .then(userProfile => {
      if (!userProfile) {
        console.error('User profile not found');
        return res.redirect('/profiles');
      }

      // Clear the user's bio
      userProfile.bio = null;

      // Save the changes to the user's profile
      userProfile.save()
        .then(() => {
          res.redirect(`/profiles/${profileId}`);
        })
        .catch(err => {
          console.error(err);
          res.redirect('/profiles');
        });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/profiles');
    });
}


export {
  index,
  show,
  requestFriend,
  acceptFriend,
  removeFriend,
  addGif,
  clearGifs,
  removeOneGif,
  updateBackgroundColor,
  updateBio,
  deleteBio,
}