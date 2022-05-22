// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
const router = require('express').Router();
// to write the path to the file.
const path = require('path');

//!html routes
/*
Where do you think the '/' route points us to? It brings us to the root route of the server! This is the route used to create a homepage for a server.

Unlike most GET and POST routes that deal with creating or return JSON data, this GET route has just one job to do, and that is to respond with an HTML page to display in the browser. So instead of using res.json(), we're using res.sendFile(), and all we have to do is tell them where to find the file we want our server to read and send back to the client.

Notice in the res.sendFile() that we're using the path module again to ensure that we're finding the correct location for the HTML code we want to display in the browser. This way, we know it will work in any server environment!
*/

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

// export the router to be able to use it in another file
module.exports = router;