import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

const User = model('User', userSchema);

export default User;
