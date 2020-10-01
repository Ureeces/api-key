let fetch = require('node-fetch');

// Used for movie search based on url based on the input in the terminal
const search = (movie, searchType, pageNum) => {
    const key = require(`./key.js`);
    if(pageNum === undefined) {
        pageNum = 1;
    }

    if(searchType === 'single') {
        return `http://www.omdbapi.com/?t=${movie}&${key}`;
    }

    else if(searchType === 'multi') {
        return `http://www.omdbapi.com/?s=${movie}&page=${pageNum}&${key}`;
    }

    return `Somehow, something went wrong. So wrong in fact, that this text should not exist. Consider it an Easter Egg. Congratulations for finding it.`;
}

// Single Fetch
const printDataSingle = function(url) {
    fetch(url)
        .then((response) => response.json())
        .then(({Title, Rated, Released, Runtime, Genre, Director, Plot, Type, totalSeasons}) => {
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
const printDataMulti = function(url, pageNum) {
    if(pageNum === undefined) {
        pageNum = 1;
    }

    fetch(url)
        .then((response) => response.json())
        .then(({Search, totalResults}) => {
            if(Search === undefined) {
                throw `No results found.`;
            }

            let totalPages = Math.ceil(totalResults / 10);

            if(pageNum > totalPages) {
                throw `Page Number does not exist.`;
            }

            console.log(`\nYour search found ${totalResults} total results:`);
            console.log(`Page ${pageNum}/${totalPages}:`);
            console.log(`-----------------------`);
            Search.forEach(({Title, Type}) => console.log(`* ${Title} (${Type})\n-`))
            console.log(`-----------------------`);
        })
        .catch((err) => console.log(err));
}

module.exports = {
    search,
    printDataSingle,
    printDataMulti
}