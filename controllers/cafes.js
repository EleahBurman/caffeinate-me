import { Cafe } from "../models/cafe.js"
function index(req, res) {
  console.log('index is working!')
  Cafe.find({})
  .then(cafes => {
    res.render('cafes/index', {
      cafes: cafes,
      title: 'All Cafes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
}

function newCafe(req, res) {
  console.log('newcafe is working')
  res.render('cafes', {
    title: 'Add Cafe'
  })
}

function create(req, res){
  console.log('create is working')
  //if an empty string is added to create a cafe, delete that string
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  //creates a new cafe doc  with the data from the object using req.body
  Cafe.create(req.body)
  .then((cafe) => { 
    //redirects using the newly created id
      res.redirect(`/cafes/${cafe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
}

function show(req, res){
  console.log('show is working')
  Cafe.findById(req.params.cafeId)
  .then(cafe=> {
    console.log('CAFE OBJ', cafe)
    res.render('cafes/show', {
      title: 'Cafe Detail',
      cafe,
    })
  }) 
  .catch(err => {
  console.log(err)
  res.redirect('/cafes')
  })
}

function update(req, res) {
  console.log('update is working')
  //the id is called via the parameters
  console.log('id', req.params.id)
    Cafe.findById(req.params.id)
    .then(cafe => {
      console.log('cafe', cafe)
      //updates the document in the body
        cafe.updateOne(req.body)
          .then(() => {
            res.redirect(`/cafes/${cafe._id}`)
          })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
}
// favoriteCoffee: String,
// leastCoffee: String,
// priceLatte: Number,
function createReview(req, res) {
  Cafe.findById(req.params.cafeId)
    .populate('reviews.reviewer')
    .then((cafe) => {
      req.body.reviewer = req.user._id;
      cafe.reviews.push(req.body);
      console.log(req.body.reviewer, 'is reviewer working')
      cafe.save();
    })
    .then(() => {
      res.redirect(`/cafes/${req.params.cafeId}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
}

//function editReview
//function deleteReview
function deleteCafe(req, res){
    Cafe.findByIdAndDelete(req.params.cafeId)
    .then(cafe =>{
      res.redirect('/cafes')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
  }

export {
  index,
  newCafe as new,
  create,
  show,
  update,
  createReview,
  deleteCafe as delete
}