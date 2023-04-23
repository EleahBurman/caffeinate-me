import { Cafe } from "../models/cafe.js"
function index(req, res) {
  Cafe.find({})
  .then(cafes => {
    res.render('cafes/index', {
      cafes: cafes,
      title: 'All Cafes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes/new')
  })
}

function newCafe(req, res) {
  res.render('cafes/new', {
    title: 'Add Cafe'
  })
}

function create(req, res){
  //if an empty string is added to create a cafe, delete that string
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  //
  Cafe.create(req.body)
  .then(cafe =>{
    res.redirect('/cafes/${cafe._id}`')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes/new')
  })
}

function update(req, res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Cafe.findByIdAndUpdate(req.params.cafeId, req.body, {new: true})
  .then(cafe => {
    res.redirect(`/cafes/${cafe._id}`)
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
  update
}