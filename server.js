/*
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
*/
// !Dependencies
const express = require('express');
// const notesArray = require('./data/db.json');// this is an array not object
const { v4: uuidv4 } = require('uuid'); // to create a uniq id needs to be install npm i uuid
const { filterByQuery, findById, createNewNote, validateNote } = require('./lib/notes');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// to be able to change files in directory we need file system module and to work with location of files path module
const fs = require('fs');
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

// Parse INCOMING (POST) string or array data we need to use (NEED TO BE SET EVERY TIME if we accept post) :
app.use(express.urlencoded({ extended: true }));
// parse INCOMING (POST) JSON data (NEED TO BE SET EVERY TIME if we accept post)
app.use(express.json());

/*
we can set up some more Express.js middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.

express.static() method - The way it works is that we provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
*/
app.use(express.static('public')); // EVERY TIME WE USE FRONT END IN THE PROJECT
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// !Routes
/*
Where do you think the '/' route points us to? It brings us to the root route of the server! This is the route used to create a homepage for a server.

Unlike most GET and POST routes that deal with creating or return JSON data, this GET route has just one job to do, and that is to respond with an HTML page to display in the browser. So instead of using res.json(), we're using res.sendFile(), and all we have to do is tell them where to find the file we want our server to read and send back to the client.

Notice in the res.sendFile() that we're using the path module again to ensure that we're finding the correct location for the HTML code we want to display in the browser. This way, we know it will work in any server environment!
*/
 //! html routes --start--
// to access front end home page
// app.get('/', (req, res) => {
//     // as a respond sends the file to the right path.
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });
// // to access front end notes page
// app.get('/notes', (req, res) => {
//     // as a respond on the request the respond is going to be:
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });
//! -- end --
//! notes routes start
// app.get('/api/notes', (req, res) => {
//     let result = notesArray;
//     if (req.query) {
//         result = filterByQuery(req.query, result)
//     }
//     res.json(result);
//     // res.json(notes)
// });

// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notesArray);
//     if (result) {
//         res.json(result);
//     }
//     else {
//         res.status(404).send('The note with the given ID was not found in the data base!');
//     }
// });
// // to create and add note to server and data base we use app.post
// app.post('/api/notes', (req, res) => {
//     // req.body is where our incoming content will be
//     console.log(req.body);
//     // before we create a new note we need to add an id to it 
//     req.body.id = uuidv4();

//     // if any data in req.body is incorrect(no text or title), send 400 error back
//     if (!validateNote(req.body)) {
//         res.status(400).send('The note is not properly formatted.');
//     }
//     else {
//         //  add note to json file and notes array in this function
//         const note = createNewNote(req.body, notesArray);
//         //return note json formatted
//         res.json(note);
//     }

// });

// app.delete('/api/notes/:id', (req, res) => {
//     // console.log(req.params.id);
//     // Look up the note
//     const note = findById(req.params.id, notesArray);
//     // if (note) {
//     //     res.json(note);
//     // }
//     // else {
//     //     res.status(404).send('The note with the given ID was not found in the data base!');
//     // }
//     //we can do it this way
//     note ? res.json(note) : res.status(404).send('The note with the given ID was not found in the data base!');
//     // Not existing, return 404
//     // Delete 
//     const index = notesArray.indexOf(note);
//     notesArray.splice(index, 1);
//     // return deleted note
//     // res.send(note); // causing error in terminal. Can't set headers after they are sent to the client
// });
//! end
// we '*' will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response.
// Thus, requests for /about or /contact or /membership will essentially be the same now
//  The order of the routes matters! The '*' route should always come last. Otherwise, it will take precedence over names routes, and you won't see what you expect to see on routes like /api/notes

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// ! Uncomment if routes dont work -- start --
// // !Functions
// function filterByQuery(query, array) {
//     let filteredResults = array;
//     if (query.title) {
//         filteredResults = filteredResults.filter(note => note.title === query.title);
//     }
//     if (query.text) {
//         filteredResults = filteredResults.filter(note => note.text === query.text);
//     }
//     return filteredResults;
// }

// function findById(id, array) {
//     const result = array.filter(note => note.id === id)[0];
//     return result;
// }

// function createNewNote(body, array) {
//     console.log(body);
//     // our function's main code will go here!
//     const note = body;
//     array.push(note);
//     // We'll have to not only use .push() to save the new data in this local server.js copy of our note data, but we'll also have to import and use the fs library to write that data to notes.json.
//     fs.writeFileSync(path.join(__dirname, './data/db.json'), JSON.stringify(notesArray, null, 2)); // this one causing problem cause it works with objects and we have array, but i fixed it by changing object to an array
//     /* 
//     we need to save the JavaScript array data as JSON, so we use JSON.stringify() to convert it. The other two arguments used in the method, null and 2, are means of keeping our data formatted. The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable. If we were to leave those two arguments out, the entire db.json file would work, but it would be really hard to read.
//     */


//     // return finished code to post route for response
//     return note;
// }

// function validateNote(note) {
//     if (!note.title || typeof note.title !== 'string') {
//         return false;
//     }
//     if (!note.text || typeof note.text !== 'string') {
//         return false;
//     }
//     return true;
// }
// !                -- end --




//! Start server
app.listen(PORT, () => {
    console.log(`🌎Server is listening on http://localhost:${PORT} 🌎`);
})

// heroku create -a example-app
// git push heroku main or if not in main git push heroku testbranch:main
//Heroku  https://sm-note-taker.herokuapp.com/ | https://git.heroku.com/sm-note-taker.git