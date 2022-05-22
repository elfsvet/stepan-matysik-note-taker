const fs = require('fs');
const path = require('path');

const filterByQuery = (query, notesArray) => {
    // Note that we save the notesArray as filteredResults here:
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    // return the filtered results:
    return filteredResults;
};

const findById = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};