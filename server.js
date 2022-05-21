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
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const { notes }=require('./data/db');
// Routes

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

// Api notes
// to get the data display from the database
app.get('/notes',(req,res)=>{
    const result = notes;
    res.json(result);
})

app.listen(PORT, () => {
    console.log(`🌎 Server Listening at: http://localhost:${PORT} 🌎`);
});