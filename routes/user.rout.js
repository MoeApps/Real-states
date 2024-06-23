import { Router } from 'express';
import bodyParser from'body-parser';
import Propirty from '../models/propirty.model.js';
import {
 sendMes,
 messages,
} from "../controllers/chat.controller.js";

import {addContactUsMsg}from '../controllers/contactus.controller.js';

import {
  signup,
  validation,
  //logvalidation,
  login,
  checkUN,
  checkEmail,
  getuser,
  edit,
} from "../controllers/user.controller.js";
import {
  addwishlist,
  navsearch,
  viewproperty,
  Search,
  profilewishlist,
} from "../controllers/propirty.controller.js";
const router = Router();
//provides the express-session middleware
//parse incoming reqs in json format
router.use(bodyParser.json());

router.get('/register', (req, res) => {
  res.render('pages/register', { errors: [] ,user: (req.session.user === undefined ? "" : req.session.user)});
})
router.get('/propirty', (req, res) => {
  Propirty.find()

  .then(result => {
    let k=result.length%6;
    if(k>0){
    var c=(parseInt(result.length/6))+1;
    }else{
      var c=(parseInt(result.length/6));
    }
    var h=0;
    res.render('pages/All', { Propirty: result,count:c,currentValue:h,  user: (req.session.user === undefined ? "" : req.session.user)});
  })
  .catch(err => {
    console.log(err);
  });
});