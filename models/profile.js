import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  backgroundColor: String,
  //profile has an array of multiple cafe objects attached
  cafes: [{type: Schema.Types.ObjectId, ref: 'Cafe'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Cafe'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  pendingOutgoingInvites: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  pendingIncomingInvites: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  gifs: [{ type: String }],
  bio: String,
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}