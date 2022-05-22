// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
const router = require('express').Router();
// getting deconstructed functions from notes.js file in lib folder to be able to use function in the file.
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
// to create a uniq id needs to be install npm i uuid
const { v4: uuidv4 } = require('uuid');
// to be able to work with our data base we need to require it
const notesArray = require('../../data/db.json');

// notes routes
//! notice what the url provided without api, we already would have api/ in server call.
// get item by query
router.get('/notes', (req, res) => {
    let result = notesArray;
    if (req.query) {
        result = filterByQuery(req.query, result)
    }
    res.json(result);
    // res.json(notes)
});

// get item by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notesArray);
    // if (result) {
    //     res.json(result);
    // }
    // else {
    //     res.status(404).send('The note with the given ID was not found in the data base!');
    // }
    // could be shorthanded like:
    (result) ? res.json(result) : res.status(404).send('The note with the given ID was not found in the data base!');
});

// to create and add note to server and data base we use app.post
router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    // before we create a new note we need to add an id to it 
    req.body.id = uuidv4();
    // if any data in req.body is incorrect(no text or title), send 400 error back
    // if (!validateNote(req.body)) {
    //     res.status(400).send('The note is not properly formatted.');
    // }
    // else {
    //     //  add note to json file and notes array in this function
    //     const note = createNewNote(req.body, notesArray);
    //     //return note json formatted
    //     res.json(note);
    // }
    // could be shorthanded like:
    (!validateNote(req.body)) ? res.status(400).send('The note is not properly formatted.') : res.json(createNewNote(req.body, notesArray));
});

// to delete a note we will use delete method of app/
router.delete('/notes/:id', (req, res) => {
    // console.log(req.params.id);
    // Look up the note
    const note = findById(req.params.id, notesArray);
    // if (note) {
    //     res.json(note);
    // }
    // else {
    //     res.status(404).send('The note with the given ID was not found in the data base!');
    // }
    //we can do it this way
    note ? res.json(note) : res.status(404).send('The note with the given ID was not found in the data base!');
    // Not existing, return 404
    // Delete 
    const index = notesArray.indexOf(note);
    notesArray.splice(index, 1);
    // return deleted note
    // res.send(note); // causing error in terminal. Can't set headers after they are sent to the client
});

// to export the routes
module.exports = router;