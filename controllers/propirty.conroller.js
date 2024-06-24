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

const viewproperty= async (req, res,next) => {
    var query = { "_id": req.params.id };
    var value;
  if(req.session.user===undefined)
  {
    Propirty.findOne(query).then(result=>{
      res.render('pages/villa', { Propirty: result,Messages:[],v:2 ,user: (req.session.user === undefined ? "" : req.session.user)});
  
    })
  }
  else{
    const exsistingwishlist = await wishlist.findOne({"userid":req.session.user._id,"propertyid":req.params.id}); 
   
    if(exsistingwishlist==null){
      value=1;
    }else{
      value=2;
    }
    Propirty.find(query)
      .then(async result => { 
        console.log(value);
        console.log('hiiii')
        var villa = result[0];
        const query1={"sender":req.session.user._id,"receiver":result[0].adminid};
        const query2={"receiver":req.session.user._id,"sender":result[0].adminid};
        console.log(req.session.user._id)
        console.log(result[0].adminid)
        const clientmes=await Message.find(query1);
        const adminmes=await Message.find(query2);
        const allMessages =[];
        for(let i=0;i<clientmes.length;i++){
             allMessages.push({message:clientmes[i],type:"user"});
        }
        for(let i=0;i<adminmes.length;i++){
          allMessages.push({message:adminmes[i],type:"admin"});
     }
     allMessages.sort((a,b)=>{return a.message.createdAt - b.message.createdAt})
     console.log(allMessages)
     console.log("zizi")
      res.render('pages/villa', { Propirty: villa,Messages:allMessages,v:value ,user: (req.session.user === undefined ? "" : req.session.user)});
      })
      .catch(err => {
        console.log(err);
      });
    }
  };
  
  
  
  const displayPropertiesDescending = async (req, res, next) => {
    try {
      const propirty = await Propirty.find().sort({ value: -1 });
  
      res.render('pages/TopProperties', { Propirty:propirty ,user: (req.session.user === undefined ? "" : req.session.user)});
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }; 

  const addprop = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("pages/addpropirty", {
        title: "Signup page - Validation Failed",
        errors: errors.array(),
      });
      return;
    }
    let imgFile;
    let uploadPath;
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    imgFile = req.files.img;
  
    uploadPath = "./public/img/" + req.body.name + ".jpg";
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
  
      console.log(req.body);
      const propirty = new Propirty({
        name: req.body.name,
        mobilenumber: req.body.mobile_number,
        mobilenumber2: req.body.other_number,
        email: req.body.name,
        servicetype: req.body.servise,
        unittype: req.body.type,
        district: req.body.district,
        garages: req.body.garage,
        area: req.body.area,
        value: req.body.value,
        unumber: req.body.u_nom,
        bathrooms: req.body.u_path,
        bedrooms: req.body.u_bed,
        furniture: req.body.f_type,
        details: req.body.details,
        Image: req.body.name + ".jpg",
        adminid: req.session.user._id,
      });
      propirty
        .save()
        .then((result) => {
          console.log("unit added succesfully");
          res.redirect("/admin");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const Search = async (req, res, next) => {
    console.log(req.body);
    const { Status, Type, Area, Price, Bedrooms, Bathrooms, Parks } = req.body;
    // price
  
    const query = {};
  
    if (Status) query.servicetype = Status;
    if (Type) query.unittype = Type;
    if (Area) query.area = Area;
    if (Price) {
      const price = parseInt(Price);
      query.value = {
        $lte: price === 1 ? 100000000 : price === 2 ? 1000000 : 500000,
      };
    }
    if (Bedrooms) {
      const bedrooms = parseInt(Bedrooms);
      if (bedrooms === 1) query.bedrooms = 1;
      else query.bedrooms = { $gte: 2 };
    }
    if (Bathrooms) {
      const bathrooms = parseInt(Bathrooms);
      if (bathrooms === 1) query.bathrooms = 1;
      else query.bathrooms = { $gte: 2 };
    }
    if (Parks) {
      const parks = parseInt(Parks);
      if (parks === 1) query.parks = 1;
      else query.parks = { $gte: 2 };
    }
  
    Propirty.find(query)
      .then((result) => {
        let k=result.length%6;
        if(k>0){
        var c=(parseInt(result.length/6))+1;
        }else{
          var c=(parseInt(result.length/6));
        }
      var h=0;
      res.render('pages/All', { Propirty: result,count:c,currentValue:h,  user: (req.session.user === undefined ? "" : req.session.user)});
      })
      .catch((err) => console.log(err));
  };
  
  //navsearch
  const navsearch = async (req, res, next) => {
    const { searchtext } = req.query;
    console.log(searchtext);
    const regex = new RegExp(`.*${(searchtext || "").toLowerCase()}.*`, "ig");
    console.log(regex);
    const query = {
      $or: [
        { type: regex },
        { name: regex },
        { servicetype: regex },
        { unittype: regex },
        { district: regex },
        { area: regex },
        { furniture: regex },
        { details: regex },
      ],
    };
    Propirty.find(query)
      .then((result) => {
        let k=result.length%6;
      if(k>0){
      var c=(parseInt(result.length/6))+1;
      }else{
        var c=(parseInt(result.length/6));
      }
      var h=0;
      res.render('pages/All', { Propirty: result,count:c,currentValue:h,  user: (req.session.user === undefined ? "" : req.session.user)});
      })
      .catch((err) => console.log(err));
  };

  const addwishlist = async (req, res, next) => {
    if(req.session.user===undefined)
    {
      res.redirect("/");
    }else{
    const exsistingwishlist = await wishlist.findOne({
      userid: req.session.user._id,
      propertyid: req.params.id,
    });
    var found;
    if (exsistingwishlist) {
      wishlist.findByIdAndDelete(exsistingwishlist._id).then(result=>{
        res.redirect("/");
      }).catch((err) => console.log(err));
      
    } else {
      const wish = new wishlist({
        userid: req.session.user._id,
        propertyid: req.params.id,
      });
      console.log(wish);
      wish
        .save()
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    }
  }
  };
  const viewprop= async (req,res,next)=>{
    Propirty.find().then(result=>{
      res.render('pages/adminUnits',{properties:result,user: (req.session.user === undefined ? "" : req.session.user)})
    })
  }
  const getprop= async (req,res,next)=>{
    const query={"_id":req.params.id};
    Propirty.findOne(query).then(result=>{
  res.render('pages/editpropirty',{prop:result,errors:[],user: (req.session.user === undefined ? "" : req.session.user)})
    })
  };