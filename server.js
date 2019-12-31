var express = require('express');
var JWT = require('jsonwebtoken');


// initializing our app application
var app = express();

app.get('/api', (req, res) => {
   res.json({
      message: 'Welcome to the JWT API Authentication Mack application'
   })
})

// our post endpoint
// we add a verifyingtoken function to the route we want to protect
app.post('/api/posts', verifyToken, (req, res) => {
   JWT.verify(req.token, 'secretNumber', (err, authData) => {
      if (err) {
         res.status(403).json({
            message: err
         });
      } else {
         res.json({
            message: 'Post Created Buddy !!! ........',
            authData
         });
      }
   });
});

//our login endpoint
app.post('/api/login', (req, res) => {
   // we will create our mock user here
   var User = {
      id: 1,
      username: 'bongomin',
      email: 'bongomindaniel@gmail.com'
   }
   JWT.sign({ User: User }, 'secretNumber', (err, token) => {
      res.json({
         token
      })
   })

})
// FOMART OF Token
// tokenAuthorization:Bearer <access_token>

// lets create the "verifyToken" Function 
// basically this is a middleware meaning it will take 3 params
function verifyToken(req, res, next) {
   //  we will first get the auth header from the browser
   const bearerHeader = req.headers['authorization'];

   // check is bearerHeader is undifined
   if (typeof bearerHeader !== 'undefined') {
      //we will split the space 
      const bearer = bearerHeader.split(" ");
      // get token from array
      const bearerToken = bearer[1];
      console.log(`the bearer token is : ${bearerToken}`);
      //  setting the token
      req.token = bearerToken;
      // next middleware
      next();
   } else {
      //forbidden
      // this will happen incase a router is restricted and has no token
      res.status(403).json({
         message: 'Access is Forbidden'
      });
   }

}









var PORT = process.env.NODE_ENV || 5000
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
})