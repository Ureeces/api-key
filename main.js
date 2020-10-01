// Use any ONE of these API's that needs an API key to get data.
// Read the docs to see how to call for and get the data that you want
// Or you can use one of your choosing if you are comfortable, HOWEVER it must require an API Key
// Parse the data, and log any important information you would like to show in a nice format of your choosing.
// You can add your own spin to the data in how you present it.
// Use any tools we've practiced such as promises, destructuring, etc.
// Once everything works, upload the file and submit.


// // Weather API- https://openweathermap.org/api
// // Weather/Air Quality API-  https://www.airvisual.com/dashboard/api
// // Recipe API- https://developer.edamam.com/ (uses two key code)
// // Superheroes API- https://superheroapi.com/index.html
// // Movies API- https://www.omdbapi.com/
// // Sports API - https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal
// // News API - https://newsapi.org/
// // Harvard Art Museum API - https://www.harvardartmuseums.org/collections/api


// If you want to make your project a little more robust and dynamic you could use tools like the ones below:
// Read the docs to see how it works. Not hard.


// Readline: https://nodejs.org/api/readline.html
// OR
// Inquirer: https://www.npmjs.com/package/inquirer
// Read the docs to find out how to use. Pretty intuitive.

// Get data from other files
const backendMethods = require('./backend.js');
const {search, printDataSingle, printDataMulti} = backendMethods;

// Input (Assumes correct input)
let userCommand = process.argv[2];
let searchFor = process.argv[3] ? process.argv[3] : '';
let pageNum = (process.argv[4] && Number.isInteger(parseInt(process.argv[4]))) ? process.argv[4] : 1;

let url = '';


// Command section
switch(userCommand) {
    case `help`:
        console.log('Format is:\nnode main.js [search type] [movie name] [page number (broad only)]\n');
        console.log(`search types include: info and broad.\n`);
        console.log(`info returns data on a specific movie. Multi-word titles with spaces must be encased in quotes.\n`);
        console.log(`broad returns a list of movie titles based on the movie title\n`);
        break;

    case `info`:
        url = search(searchFor, 'single');
        printDataSingle(url);
        break;

    case `broadSearch`:
    case `broad`:
        url = search(searchFor, 'multi', pageNum);
        printDataMulti(url, pageNum);
        break;

    default: 
        console.log(`Unknown command.`);
        break;
}