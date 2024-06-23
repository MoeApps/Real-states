import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const user = new mongoose.Schema(
  {
    firstname :{
      type:String,
      required:false
    },
    lastname :{
      type:String,
      required:false,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    birthdate:{
      type:Date,
      required:false,
    },
    gender:{
      type:String,
      required:false,
    },
    password: String,
    type: String,
    photo: {
      type: String,
      trim: true,
      required: false,
    },
  },
  { timestamps: true }
);

// user.pre("save", function (next) {
//   const user = this;

//   // Only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // Generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err);

//     // Hash the password using the generated salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       // Override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });


// cb: This is a callback function that will be invoked with the comparison result. 
// The callback function takes two parameters (err, isMatch).
// err: This is an error object. If an error occurred, it will be populated. 
// If the comparison succeeds, null is passed as the first parameter
// isMatch: This is a boolean value that indicates whether the candidate password matches the hashed password.

user.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/// bcrypt Sync vs Async
// To Process the signup logic
// We recommend using async API if you use bcrypt on a server.
// Bcrypt hashing is CPU intensive which will cause the sync APIs to block the event loop
// and prevent your application from servicing any inbound requests or events.
// The async version uses a thread pool which does not block the main event loop.
// const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
//   console.log(hash);
// });
// bcrypt.hash(req.body.confirmPassword, saltRounds).then(function (hash) {
//  console.log(hash);
// });

const User = mongoose.model("User", user);

export default User;