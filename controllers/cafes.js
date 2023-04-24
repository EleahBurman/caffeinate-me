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
    res.render('cafes/show', {
      cafe,
      title: `${cafe.name}`
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cafes')
  })
})

}

function update(req, res) {
  console.log('update is working')
  //the id is called via the parameters
    Cafe.findById(req.params.id)
    .then(cafe => {
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

export {
  index,
  newCafe as new,
  create,
  show,
  update,
}