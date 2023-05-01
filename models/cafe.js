import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  favoriteCoffee: String,
  leastCoffee: String,
  milk: String,
  priceLatte: Number,
  reviewer: { type: Schema.Types.ObjectId, ref: 'Profile' },
})

const cafeSchema = new Schema({
  name: String,
  location: String,
  reviews: [reviewSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Cafe = mongoose.model('Cafe', cafeSchema)

export {
  Cafe
}