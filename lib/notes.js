// !Dependencies
// to be able to change files in directory we need file system module and to work with location of files path module
const fs = require('fs');
const path = require('path');
const notesArray = require('../data/db.json');// this is an array not object


// !Functions

const filterByQuery = (query, array) => {
    let filteredResults = array;
    // if (query.title) {
    //     filteredResults = filteredResults.filter(note => note.title === query.title);
    // }
    // could be shorthanded like:
    if (query.title) return filteredResults = filteredResults.filter(note => note.title === query.title);
    // if (query.text) {
    //     filteredResults = filteredResults.filter(note => note.text === query.text);
    // }
    // could be shorthanded like:
    if (query.text) return filteredResults = filteredResults.filter(note => note.text === query.text);
    return filteredResults;
}

const findById = (id, array) => {
    // const result = array.filter(note => note.id === id)[0];
    // return result;
    // could be shorthanded like:
    return array.filter(note => note.id === id)[0];
}

const createNewNote = (body, array) => {
    // console.log(body);
    // our function's main code will go here!
    const note = body;
    array.push(note);
    // We'll have to not only use .push() to save the new data in this local server.js copy of our note data, but we'll also have to import and use the fs library to write that data to notes.json.
    fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(notesArray, null, 2)); // this one causing problem cause it works with objects and we have array, but i fixed it by changing object to an array
    /* 
    we need to save the JavaScript array data as JSON, so we use JSON.stringify() to convert it. The other two arguments used in the method, null and 2, are means of keeping our data formatted. The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable. If we were to leave those two arguments out, the entire db.json file would work, but it would be really hard to read.
    */
    // return finished code to post route for response
    return note;
}

const validateNote = note => {
    // if (!note.title || typeof note.title !== 'string')
    //     return false;
    // }
     // could be shorthanded like:
    if (!note.title || typeof note.title !== 'string') return false;
    // if (!note.text || typeof note.text !== 'string') {
    //     return false;
    // }
     // could be shorthanded like:
    if (!note.text || typeof note.text !== 'string') return false;
    return true;
}






module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
}