let fetch = require('node-fetch');

// Used for movie search based on url based on the input in the terminal
const search = (movie, searchType) => {
    if(searchType === 'single') {
        return `http://www.omdbapi.com/?t=${movie}&apikey=ada86d43`;
    }

    else if(searchType === 'multi') {
        return `http://www.omdbapi.com/?s=${movie}&apikey=ada86d43`;
    }

    return `Wrong input dummy.`;
}

// Test Data
let url = search(`Jaws`, `single`);

// Single Fetch
fetch(url)
    .then((response) => response.json())
    .then(({Title, Year, Rated, Released, Director, Plot}) => {
        console.log(`Title: ${Title}`);
        console.log(`Directed By: ${Director}`);
        console.log(`Release Date: ${Released}`);
        console.log(`Rated ${Rated}`);
        console.log(`Short Summary:\n${Plot}`);
    })
    .catch((err) => console.log(err))