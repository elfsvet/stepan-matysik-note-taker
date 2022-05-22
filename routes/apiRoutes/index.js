// Next, we're going to add middleware so that our app knows about the routes in noteRoutes.js

// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
const router = require('express').Router();

const noteRoutes = require('../apiRoutes/noteRoutes');
// we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application. It may seem like overkill with just one exported module, but as your application evolves, it will become a very efficient mechanism for managing your routing code and keeping it modularized.
router.use(noteRoutes);

// to export the routes
module.exports = router;