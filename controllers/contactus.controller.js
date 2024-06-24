import Contactusmsg from "../models/contactus.model.js";
import { body, validationResult } from "express-validator";
import __dirname from "../app.js"; //
import Contactus from "../models/contactus.model.js";


const contactUsValidation = [
  body("cname").notEmpty().withMessage("Name is required"),
  body("cmail").isEmail().withMessage("Invalid email"),
  body("cphone").isMobilePhone().withMessage("Phone is required"),
  body("cloc").notEmpty().withMessage("Location is required"),
  body("cmes").notEmpty().withMessage("Message is required"),
];

