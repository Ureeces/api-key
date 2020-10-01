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
        .then(({Title, Rated, Released, Runtime, Genre, Director, Writer, Plot, Type, totalSeasons}) => {
            if(Title === undefined) {
                throw `Movie not found!`;
            }
            console.log(`\n-----------------------`);
            console.log(`Title: ${Title}`);
            console.log(`Type: ${Type}`);

            if(Type === 'movie') {
                console.log(`Directed By: ${Director}`);
                console.log(`Runtime: ${Runtime}`);
            }

            else if(Type === 'series') {
                console.log(`Seasons: ${totalSeasons}`);
                console.log(`Average Episode Runtime: ${Runtime}`);
            }
            
            console.log(`Genre(s): ${Genre}`);
            console.log(`Release Date: ${Released}`);
            console.log(`\nShort Summary:\n${Plot}\n`);
            console.log(`Rated ${Rated}`);
            console.log(`-----------------------`);
        })
        .catch((err) => console.log(err));
}

// Multi Fetch
const printDataMulti = function(url) {
    fetch(url)
        .then((response) => response.json())
        .then(({Search}) => {
            if(Search === undefined) {
                throw `No results found.`;
            }

            console.log(`\nYour search found ${Search.length} results:`);
            console.log(`-----------------------`);
            Search.forEach(({Title}, index) => console.log(`${index + 1}. ${Title}`))
            console.log(`-----------------------`);
        })
        .catch((err) => console.log(err));
}

module.exports = {
    search,
    printDataSingle,
    printDataMulti
}