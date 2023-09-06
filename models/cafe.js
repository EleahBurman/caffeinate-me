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

const meetupSchema = new Schema({
  date: Date, // Date and time of the meetup
  description: String,
  email: String,
  attendees: [{ type: Schema.Types.ObjectId, ref: 'Profile' }], // Users attending the meetup
});

const cafeSchema = new Schema({
  name: String,
  location: String,
  reviews: [reviewSchema],
  meetups: [meetupSchema], // Embed meetups as an array
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
});

const Cafe = mongoose.model('Cafe', cafeSchema);

export {
  Cafe,
};
