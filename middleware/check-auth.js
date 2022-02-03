const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

  try{

    const token = req.headers.authorization.split(" ")[1];
    const verify= jwt.verify(token,"This is secret key");
 
    next();

   
    
  }
  catch(e) {
      res.status(401).json({
err:"Invalid Token"
      });
  }
}