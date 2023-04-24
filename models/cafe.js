import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  favoriteCoffee: String,
  leastFavoriteCoffee: String,
  priceLatte: Number,
  reviewer: { type: Schema.Types.ObjectId, ref: 'Profile' },
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const cafeSchema = new Schema({
  name: String,
  location: String,
  reviews: [reviewSchema],
})

const Cafe = mongoose.model('Cafe', cafeSchema)

export {
  Cafe
}