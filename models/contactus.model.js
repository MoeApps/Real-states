import mongoose from "mongoose";

const contactus = new mongoose.Schema(
  {
    name :{
        type:String,
        required:false
      },
      phoneNumber :{
        type:String,
        required:false,
      },
       email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
      },
      location :{
        type:String,
        required:false,
      },
      message:{
        type:String,
        required:false
      }
  },