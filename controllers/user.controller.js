import User from '../models/user.model.js';
import Propirty from '../models/propirty.model.js';
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt"; 


const saltRounds = 10;
// Function to make a user an admin
export const makeAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      res.send('User not found');
      return;
    }

    // Update the user's role to "admin"
    user.type = 'admin';

    // Save the updated user
    await user.save();

    console.log('User is now an admin');
    res.redirect('/admin/viewusers');
  } catch (error) {
    console.log(error);
    res.send('An error occurred');
  }
};

const validation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("pages/register", {
        title: "Signup page - Validation Failed",
        errors: errors.array(),
      });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);
      const existingUser = await User.findOne({ username: req.body.username });
      const existingemail = await User.findOne({ email: req.body.email });
  
      if (existingemail) {
        console.log("Email already exists");
        res.send("Email already exists");
      }else if(existingUser){
        console.log("username already exists");
        res.send("username already exists");
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          type:req.body.type,
          photo:"profile.jpg",
        });
  
        await newUser.save().then(result =>{
          req.session.user=result;
  
        })
  
  
        console.log("User saved successfully");
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      res.send("An error occurred");
    }
  };
  
  // const logvalidation = [
  //  body("logusername").notEmpty().withMessage("Username is required"),
  //   body("logpassword").notEmpty().withMessage("password is required"),
  
  // ];
  const login = async (req, res, next) => {
 
    const existinguser = await User.findOne({ username: req.body.logusername });
    if(existinguser){
      const hashePassword =await bcrypt.compare(req.body.logpassword, existinguser.password);
      if(hashePassword){
        req.session.user=existinguser;
        if(req.session.user.type=='admin'){
         res.redirect('/admin');
        }else{
        console.log("User loged in successfully");
        res.redirect('/');
        }
      }else{
        console.log("password is not correct");
        res.send("password is not correct");
      }
    }else{
      console.log("username does not exists");
       res.send("username does not exists");
    }
  
  };
  const getalluser = async (req, res, next) => {
    const properties = await Propirty.find().sort({ value: -1 }).limit(5);
    User.find().then(result => {
      res.render('pages/adminHeader', { Users: result,Propirty :properties,user: (req.session.user === undefined ? "" : req.session.user) });
    }).catch(err => {
      console.log(err);
    });
  
  }
  const getallusers = async (req, res, next) => {
  
    User.find().then(result => {
    console.log(result);
      res.render('pages/adminUser', { Users: result ,user: (req.session.user === undefined ? "" : req.session.user)});
  }).catch(err => {
      console.log(err);
    });
  
  }
  //ajax
const checkUN = async (req, res) => {
    var query = { username: req.body.username };
    User.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send(' taken');
            }
            else {
                res.send(' available');
            }
        })
        .catch(err => {
            console.log(err);
        });
  };
  const checkEmail = async (req, res) => {
    var query = { email: req.body.email };
    User.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
  };
  const getuser=async (req, res, next) => {
    const query={"_id":req.params.id};
    User.findOne(query).then(result=>{
  res.render('pages/edituser',{errors: [],profile:result,user: (req.session.user === undefined ? "" : req.session.user)});
    }) .catch(err => {
            console.log(err);
        });
  }
  const edit=async (req, res, next) => {
    try{
      const userr = await User.findOne({ "_id": req.params.id });
      let vall=userr.photo;
      let existingemail,existingUser;
      if(userr.email!==req.body.email)
      {
        existingemail = await User.findOne({ email: req.body.email });
      }
      if(userr.username!==req.body.username)
      {
        existingUser = await User.findOne({ username: req.body.username });
      }
      if (existingemail) {
        console.log("Email already exists");
        res.send("Email already exists");
      }else if(existingUser){
        console.log("username already exists");
        res.send("username already exists");
      } else {
        let imgFile;
    let uploadPath;
    if (req.files !== null){
    if ( Object.keys(req.files).length !== 0) {
      imgFile = req.files.img;
  
      uploadPath = './public/img/' + req.body.username + '.jpg';
      // Use the mv() method to place the file somewhere on your server
      imgFile.mv(uploadPath, function (err) {
        if (err)
          return res.status(500).send(err);
        });
        vall=req.body.username +".jpg";
    }
  }
      User.findByIdAndUpdate(req.params.id, { 
        username: req.body.username,
        firstname:req.body.first,
        lastname:req.body.last,
        email:req.body.email,
        birthdate:req.body.date,
        gender:req.body.gender,
        photo:vall,
       }).then(result => {
        console.log(req.session.user.type);
        if(req.session.user.type=="admin")
        {
          res.redirect('/admin/viewusers')
        }else{
        res.redirect('/')
        }
    })
    .catch(err => {
        console.log(err);
    });
      }
    } catch (error) {
      console.log(error);
      res.send("An error occurred");
    }
  }