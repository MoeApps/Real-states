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

message.save()  //insert in database


  .catch(err => {
    console.log(err);
  });
}) 

.catch(err1 => {
  console.log(err1);
});
};



   ///useful for displaying history of messages between user and admin.
 const messages= async (req,res,next)=>{
  const query={"_id":req.params.id}
  Propirty.findOne(query).then(res=>{
    console.log(req.session.user._id)
    console.log(res.adminid)
  const query1={"sender":req.session.user._id,"receiver":res.adminid};

  Message.findOne(query1).then(res=>{console.log(res)});
});
 }

const getsingleuserchat= async function (req, res, next) {
  const query1={"sender":req.session.user._id,"receiver":req.params.id};
  const query2={"receiver":req.session.user._id,"sender":req.params.id};
  console.log(req.session.user._id)
  console.log(req.params.id)
  const clientmes=await Message.find(query2);
  const adminmes=await Message.find(query1);
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
res.render('pages/chatAdmin', { Messages:allMessages ,user: (req.session.user === undefined ? "" : req.session.user)});

};

const sendMsgFromAdmin=async function(req, res, next) {
    const content =req.body.content;
  
    if(!content){
        console.log("Invalid data passed into request emptymsg");
        return res.sendStatues(400);
    }
    console.log(req.body);
    const message = new Message({
    sender: req.session.user._id,
    content: req.body.content,
    receiver: req.params.id,
    //
    });
    message.save()
  
    .catch(err => {
      console.log(err);
    });
  
    };