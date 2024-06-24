import { Router } from 'express';
import User from '../models/user.model.js';
import { addprop ,deleteprop,viewprop ,getprop,edit,displayPropertiesDescending} from "../controllers/propirty.controller.js";
import Message from '../models/message.model.js';
import { getalluser, getallusers, makeAdmin } from "../controllers/user.controller.js";
import{
  getsingleuserchat,
  sendMsgFromAdmin,
  chats
}from "../controllers/chat.controller.js"
const router = Router();

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.type === 'admin') {
      next();
  }
  else {
      res.render('pages/err', { err: 'You are not an Admin',user: (req.session.user === undefined ? "" : req.session.user) })
  }
});

router.get('/', getalluser);
router.get('/delprop/:id',deleteprop);
router.get('/editprop/:id',getprop)
router.get('/deleteuser/:id', (req, res, next) => {
  console.log(req.params.id)
  User.findByIdAndDelete(req.params.id)
    .then(result => {
      res.redirect('/admin/viewusers');
    })
    .catch(err => {
      console.log(err);
    });
});