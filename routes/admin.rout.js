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