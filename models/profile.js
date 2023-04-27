import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  //profile has an array of multiple cafe objects attached
  cafes: [{type: Schema.Types.ObjectId, ref: 'Cafe'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Cafe'}]
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}