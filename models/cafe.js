import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  favoriteCoffee: String,
  leastCoffee: String,
  milk: String,
  priceLatte: {
    type: mongoose.Decimal128,
    get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  reviewer: { type: Schema.Types.ObjectId, ref: 'Profile' },
});

const cafeSchema = new Schema({
  name: String,
  location: String,
  city: String,
  reviews: [reviewSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
});

const Cafe = mongoose.model('Cafe', cafeSchema);

export {
  Cafe,
};
