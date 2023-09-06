import { Cafe } from '../models/cafe.js';
import { Profile } from '../models/profile.js';

function index(req, res) {
  Cafe.find({})
  .populate('reviews')
  .then(cafes => {
    res.render('cafes/index', {
      cafes: cafes,
      title: 'All Cafes',
      nav: 'cafes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
}

function newCafe(req, res) {
  res.render('cafes', {
    title: 'Add Cafe',
    nav: 'cafes'
  })
}

function create(req, res){
  req.body.owner = req.user.profile._id
  //creates a new cafe doc  with the data from the object using req.body
  Cafe.create(req.body)
  .then((cafe) => { 
    //first find appropriate profile
    Profile.findById(req.user.profile._id)
    .then((profile)=>{
      profile.cafes.push(cafe)
      profile.save()
      .then((profile)=>{
        res.redirect(`/cafes/${cafe._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/cafes')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
}

function show(req, res) {
  Cafe.findById(req.params.cafeId)
    .populate([
      {
        path: 'owner',
        model: 'Profile',
      },
      {
        path: 'reviews.reviewer',
        model: 'Profile',
      },
      {
        path: 'meetups.attendees',
        model: 'Profile'
      }
    ])
    .then((cafe) => {
      if (!cafe) {
        return res.status(404).json({ error: 'Cafe not found' });
      }

      res.render('cafes/show', {
        title: 'Cafe Detail',
        cafe: cafe,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/cafes');
    });
}


function update(req, res) {
  //the id is called via the parameters
  Cafe.findById(req.params.id)
    .populate('reviews.reviewer')
    .then(cafe => {
      if (cafe.owner.equals(req.user.profile._id)) {
        //updates the document in the body
        cafe.updateOne(req.body)
          .then(() => {
            res.redirect(`/cafes/${cafe._id}`)
          })     
      } else {
        throw new Error ('You did not create this review. Do not pass go. Do not collect $200.')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
}


function createReview(req, res) {
  Cafe.findById(req.params.cafeId)
    .then((cafe) => {
      // store reviewer's objectId
      req.body.reviewer = req.user.profile._id
      cafe.reviews.push(req.body)
      // save the changes to the cafe document and return the promise
      cafe.save()
      .then(() => {
      res.redirect(`/cafes/${cafe._id}`)
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/')
      })
    .catch((err) => {
      console.log(err);
      res.redirect('/')
    })
  })
}

function editReview(req, res) {
  Cafe.findById(req.params.cafeId)
    .then(cafe => {
    // find the review by its id
    const review = cafe.reviews.id(req.params.reviewId)
    if(review.reviewer.equals(req.user.profile._id)){
      res.render('cafes/edit', {
        review: review,
        cafe: cafe,
        title: 'Edit Cafe Review'
      })
    } else {
      throw new Error('You did not create this review. Do not pass go. Do not collect $200.')
    }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/cafes');
    })
}

function updateReview(req, res) {
  Cafe.findById(req.params.cafeId)
    .then(cafe => {
      const review = cafe.reviews.id(req.params.reviewId)
      if (review.reviewer.equals(req.user.profile._id)) {
      //Replaces any properties in the review that have a matching property names on req.body
      review.set(req.body)
      cafe.save()
      .then(() => {
        res.redirect(`/cafes/${cafe._id}`)
      })
      .catch(err => {
        console.log(err)        
        res.redirect('/cafes')
      })
    } else {
      throw new Error ('You did not create this review. Do not pass go. Do not collect $200.')
    }
  })
  .catch(err => {
  console.log(err)
  res.redirect('/cafes')
  })
}

function deleteReview(req, res) {
  Cafe.findById(req.params.cafeId)
  .then(cafe => {
    const review = cafe.reviews.id(req.params.reviewId)
    if (review.reviewer.equals(req.user.profile._id)) {
      cafe.reviews.remove(review)
      cafe.save()
      .then(() => {
        res.redirect(`/cafes/${cafe._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/cafes')
      })
    } else {
      throw new Error ('You did not create this review. Do not pass go. Do not collect $200.')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
}

function deleteCafe(req, res){
    Cafe.findByIdAndDelete(req.params.cafeId)
    .then(cafe =>{
      if(cafe.owner.equals(req.user.profile._id)) {
        cafe.deleteOne()
        .then(() => {
          res.redirect('/cafes')
        })
      } else {
        throw new Error ('You did not create this review. Do not pass go. Do not collect $200.')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
  }

  function createMeetup(req, res) {
    const cafeId = req.params.cafeId;
    const { date, description } = req.body;
  
    // Validate input data here if necessary
  
    Cafe.findById(cafeId)
      .then((cafe) => {
        if (!cafe) {
          return res.status(404).json({ error: 'Cafe not found' });
        }
  
        const meetup = {
          date,
          description,
          attendees: [], // You can initialize attendees as an empty array
        };
  
        cafe.meetups.push(meetup);
        return cafe.save();
      })
      .then((cafe) => {
        // Cafe and meetup saved successfully
        // Redirect to the cafe's show page after creating the meetup
        res.redirect(`/cafes/${cafe._id}`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
  
  
export {
  index,
  newCafe as new,
  create,
  show,
  update,
  createReview,
  editReview,
  updateReview,
  deleteReview,
  deleteCafe as delete,
  createMeetup
}