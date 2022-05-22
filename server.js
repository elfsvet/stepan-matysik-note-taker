// !Dependencies
// Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require('express');
// load the router modules in the app
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// to be able to change files in directory we need file system module and to work with location of files path module
const path = require('path');


// Initializing express
const PORT = process.env.PORT || 3001;
const app = express();

// !Middleware - is a helper function that works between the response and request cycle

/*
In order for our server to accept incoming data the way we need it to, we need to tell our Express.js app to intercept our POST request before it gets to the callback function. At that point, the data will be run through a couple of functions to take the raw data transferred over HTTP and convert it to a JSON object.

First, we used the app.use() method. This is a method executed by our Express.js server that mounts a function to the server that our requests will pass through before getting to the intended endpoint. The functions we can mount to our server are referred to as middleware.

Middleware functions allow us to keep our route endpoint callback functions more readable while letting us reuse functionality across routes to keep our code DRY.

The express.urlencoded({extended: true}) method is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.

The express.json() method we used takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. Both of the above middleware functions need to be set up EVERY TIME you create a server that's looking to accept POST data.
*/

// Parse INCOMING (POST) STRING or ARRAY data we need to use (NEED TO BE SET EVERY TIME if we accept post) :
app.use(express.urlencoded({ extended: true }));
// parse INCOMING (POST) OBJECT JSON data (NEED TO BE SET EVERY TIME if we accept post)
app.use(express.json());

/*
we can set up some more Express.js middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.

express.static() method - The way it works is that we provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
*/
app.use(express.static('public')); // EVERY TIME WE USE FRONT END IN THE PROJECT
// The app will now be able to handle requests to /, /api and /api/notes, as well as call the  middleware functions that is specific to the route.
// app.use will target index.js files in the folders we required 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// !Routes

// we '*' will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response.
// Thus, requests for /about or /contact or /membership will essentially be the same now
//  The order of the routes matters! The '*' route should always come last. Otherwise, it will take precedence over names routes, and you won't see what you expect to see on routes like /api/notes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//! Start server
// starts server with variable port in local development we will use 30001 port but when we will upload it to the server it will use around 80.
app.listen(PORT, () => {
    console.log(`🌎Server is listening on http://localhost:${PORT} 🌎`);
});

//! HEROKU INFO
// heroku create -a example-app
// git push heroku main or if not in main git push heroku testbranch:main
//Heroku  https://sm-note-taker.herokuapp.com/ | https://git.heroku.com/sm-note-taker.git