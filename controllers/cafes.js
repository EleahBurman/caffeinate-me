// import {Cafe} from "../models/cafe.js"
// function index(req, res) {
//   Cafe.find({})
//   .then(cafes => {
//     res.render('cafes/index', {
//       cafes: cafes,
//       title: 'All Cafes'
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/cafes/new')
//   })
// }

// function newCafe(req, res) {
//   res.render('cafes/new', {
//     title: 'Add Cafe'
//   })
// }

// export {
//   index,
//   newCafe as new,
// }