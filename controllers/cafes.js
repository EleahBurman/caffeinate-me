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
    res.redirect('/cafes/new')
  })
}

function newCafe(req, res) {
  console.log('newcafe is working')
  res.render('cafes/new', {
    title: 'Add Cafe'
  })
}

function create(req, res){
  console.log('create is working')
  //if an empty string is added to create a cafe, delete that string
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  //
  Cafe.create(req.body)
  .then((cafe) => {
    if (cafe.owner.equals(req.user.profile._id)) { 
      res.redirect(`/cafes/${cafe._id}`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes/new')
  })
}

function update(req, res) {
  console.log('update is working')
  if (cafe.owner.equals(req.user.profile._id)){ 
    Cafe.findById(req.params.id)
    .then(cafe => {
      if (cafe.owner.equals(cafe.user.profile._id)) {
        cafe.updateOne(req.body)
          .then(() => {
            res.redirect(`/cafes/${cafe._id}`)
          })
      } else {
        throw new Error('Not authorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/cafes')
    })
  }
}

function show(){

}
export {
  index,
  newCafe as new,
  create,
  update,
  show
}