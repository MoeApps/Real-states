import Propirty from '../models/propirty.model.js';
import __dirname from '../app.js'
import wishlist from '../models/wishlist.model.js';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import { body, validationResult } from "express-validator";
import fs from 'fs';
import path from 'path';
import fileUpload from "express-fileupload";
import { login } from './user.controller.js';
import { messages } from './chat.controller.js';

const validation = [
  body("name").notEmpty().withMessage("name is required"),
  body("mobile_number").notEmpty().withMessage("mobile number is required"),
  body("u_bed").notEmpty().withMessage("bedroom is required"),
  body("servise").notEmpty().withMessage("servise type is required"),
  body("type").notEmpty().withMessage("unit type is required"),
  body("district").notEmpty().withMessage("location is required"),
  body("f_type").notEmpty().withMessage("furniture is required"),
  body("garage").notEmpty().withMessage("number of garages is required"),
  body("area").notEmpty().withMessage("unit area is required"),
  body("vale").notEmpty().withMessage("Username is required"),
  body("u_nom").notEmpty().withMessage("Username is required"),
  body("u_path").notEmpty().withMessage("Username is required"),
  body("img").notEmpty().withMessage("Username is required"),
];
const deleteprop=async (req,res,next)=>{
    const now=await Propirty.findOne({"_id":req.params.id})
    const bee='./public/img/'+now.Image;
    Propirty.findByIdAndDelete(req.params.id)
      .then(result => {
        fs.unlink(bee, (err) => {
          if (err) {
            throw err;
          }
          res.redirect('/admin/prop');
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  const profilewishlist= (req, res,next) => {
    var query = { "_id": req.params.id };
    const arr=[];
    User.find(query)
      .then(result1 => {
    wishlist.find({"userid":req.params.id}).then(async result=>{
    console.log(result);
    if(result.length>0){
    for(var i=0;i<result.length;i++){
      const prop=await Propirty.findOne({"_id":result[i].propertyid})
        arr[i]=prop;
      }
    }
     res.render('pages/profile', { User: result1[0], wish : arr , user: (req.session.user === undefined ? "" : req.session.user)});
  }).catch(err1 => {
    console.log(err1);
  });
  })
      .catch(err => {
        console.log(err);
      });
  };

  const getTopSalesProperties = async (req, res) => {
    const Property = require('/models/propirty.model');
    try {
      
      const properties = await Property.find().sort({ value: -1 }).limit(5);
  
      res.render('admin-dashboard', { properties });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  };