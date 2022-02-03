var nodemailer = require('nodemailer');
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var checkAuth = require('../middleware/check-auth');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'himanshu.rav.roton@gmail.com',
      pass: 'Hroton@075'
    }
  });



 
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  
router.post('/', checkAuth ,urlencodedParser, (req, res, next) => {
    
    
  var mailOptions = {
    from: 'himanshu.rav.roton@gmail.com',
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).json({
          err:error
      });
    } else {
      res.status(200).json({
          mess:"Mail Sent" 
      });
    }
  });

});



module.exports = router;