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

const addContactUsMsg =  async (req, res, next) => {
    console.log("b");
    const { cname, cmail, cphone, cloc,cmes } = req.body;
    console.log("c");
    try {
      console.log("a");
      const contact = new Contactus({
        name: cname,
        phoneNumber: cphone,
        email: cmail,
        location: cloc,
        message: cmes
        //
        });
        contact.save()
      
        .catch(err => {
          console.log(err);
        });
    }
    catch (error) {
      res.send("Message Could not be Sent");
    }
    res.send("Message Succssfully Sent!");
  };
  
  export { addContactUsMsg };