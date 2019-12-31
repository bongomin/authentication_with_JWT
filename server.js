var express = require('express');
var JWT = require('jsonwebtoken');


// initializing our app application
var app = express();

app.get('/', (req, res) => {
   res.json({
      message: 'Welcome to the JWT API Authentication Mack application'
   })
})






var PORT = process.env.NODE_ENV || 5000
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
})