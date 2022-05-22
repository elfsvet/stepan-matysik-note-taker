const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const { v4: uuidv4 } = require('uuid'); // to create a uniq id needs to be install npm i uuid
const notesArray = require('../../data/db.json');


// notes routes
router.get('/notes', (req, res) => {
    let result = notesArray;
    if (req.query) {
        result = filterByQuery(req.query, result)
    }
    res.json(result);
    // res.json(notes)
});

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

module.exports = router;