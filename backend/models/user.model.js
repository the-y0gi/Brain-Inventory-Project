import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: [3, "Name Minimum length is 3"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    require: true,
    trim: true,
    select: false,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  image: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

//token generate logic
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

//hash password logic
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
