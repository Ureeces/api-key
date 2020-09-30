let fetch = require('node-fetch');

// Used for movie search based on url based on the input in the terminal
const search = (movie, searchType) => {
    const key = require(`./key.js`);

    if(searchType === 'single') {
        return `http://www.omdbapi.com/?t=${movie}&${key}`;
    }

    else if(searchType === 'multi') {
        return `http://www.omdbapi.com/?s=${movie}&${key}`;
    }

    return `Somehow, something went wrong. So wrong in fact, that this text should not exist. Consider it an Easter Egg. Congratulations for finding it.`;
}

// Single Fetch
const printDataSingle = function(url) {
    fetch(url)
        .then((response) => response.json())
        .then(({Title, Rated, Released, Director, Plot}) => {
            if(Title === undefined) {
                throw `Movie not found!`;
            }
            
            console.log(`Title: ${Title}`);
            console.log(`Directed By: ${Director}`);
            console.log(`Release Date: ${Released}`);
            console.log(`Short Summary:\n${Plot}`);
            console.log(`Rated ${Rated}`);
        })
        .catch((err) => console.log(err))
}

// Multi Fetch
const printDataMulti = function(url) {

}

module.exports = {
    search,
    printDataSingle,
    printDataMulti
}