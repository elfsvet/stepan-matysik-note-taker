const router = require('express').Router();
const path = require('path');

//html routes
// to access front end home page
router.get('/', (req, res) => {
    // as a respond sends the file to the right path.
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// to access front end notes page
router.get('/notes', (req, res) => {
    // as a respond on the request the respond is going to be:
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

module.exports = router;