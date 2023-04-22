import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  googleId: String,
  //user has one profile attached so it is one object
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export {
  User
}
