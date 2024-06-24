import { Result } from 'express-validator';
import Message from '../models/message.model.js';
import Propirty from '../models/propirty.model.js';
import User from '../models/user.model.js';

const sendMes = async (req, res, next) => {
    const query={"_id":req.params.id}
Propirty.findOne(query).then(result=>{
  const content =req.body.content;

  if(!content){
      console.log("Invalid data passed into request emptymsg");
      return res.sendStatues(400);
  }
console.log(req.body);
const message = new Message({
  sender: req.session.user._id,
 content: req.body.content,
 receiver: result.adminid,

});