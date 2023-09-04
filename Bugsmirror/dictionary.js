
// import fs from node js

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const dictionaryFile = 'dictionary.txt';

//To display the option available for the users.

function displayMenu() {
    console.log('\nDictionary Console Tool  ');
    console.log('1. Add Word and Meaning');
    console.log('2. Search for Word Meaning');
    console.log('3. Remove Word and Meaning');
    console.log('4. Exit');
}

// To check the word is already present or not...

function isDuplicate(word, data) {
    const searchTerm = `${word.trim().toLowerCase()} -`;
    return data.includes(searchTerm);
}

// TO update the word meaning in the file...

function updateWordAndMeaning(word, meaning, data) {
    const searchTerm = `${word.trim().toLowerCase()} -`;
    const updatedLines = [];
    let wordFound = false;

    for (const line of data) {
        if (line.startsWith(searchTerm)) {
            updatedLines.push(`${word.trim().toLowerCase()} - ${meaning.trim().toLowerCase()}`);
            wordFound = true;
        } else {
            updatedLines.push(line);
        }
    }

    if (!wordFound) {
        updatedLines.push(`${word.trim().toLowerCase()} - ${meaning.trim().toLowerCase()}`);
    }

    return updatedLines.join('\n');
}


// To insert word and meaning in the dictionary.txt file.
// I also handled upperCase and lowerCase and the mixture of both cases.
// User can insert word in any formate in the dictionary.txt file (ex- uppercase , lowercase , mixture of both)

function addWordAndMeaning() {
    rl.question('Enter a word: ', (word) => {
        rl.question('Enter the meaning: ', (meaning) => {
            try {
               
                let data = fs.readFileSync(dictionaryFile, 'utf8').split('\n');
                data = updateWordAndMeaning(word, meaning, data);
                fs.writeFileSync(dictionaryFile, data);
                console.log('Word and meaning added or updated successfully in the dictionary!');
            } catch (err) {
                console.error('Error while adding word and meaning in the dictionary :', err.message);
            }
            displayMenu();
        });
    });
}

// for searching the meaning of word in the dictionary.txt file 
// user will search through any formate of word like uppercase , lowercase or both

function searchWordMeaning() {
    rl.question('Enter the word to be search for its meaning in dictionary : ', (word) => {
        try {
            const searchTerm = `${word.trim().toLowerCase()} -`;
            const data = fs.readFileSync(dictionaryFile, 'utf8');
            const lines = data.split('\n');
            for (const line of lines) {
                if (line.startsWith(searchTerm)) {
                    console.log('Meaning :', line.substring(searchTerm.length).trim());
                    rl.close();
                    return;
                }
            }
            console.log('Word not found in the dictionary.');
        } catch (err) {
            console.error('Error while reading dictionary file:', err.message);
        }
        displayMenu();
    });
}

// To remove the word meaning from the dictionary.txt file 

function removeWordAndMeaning() {
    rl.question('Enter a word to remove: ', (word) => {
        try {
            const searchTerm = `${word.trim().toLowerCase()} -`;
            let data = fs.readFileSync(dictionaryFile, 'utf8');
            const lines = data.split('\n');
            const updatedLines = [];
            let wordFound = false;
            for (const line of lines) {
                if (line.startsWith(searchTerm)) {
                    wordFound = true;
                } else {
                    updatedLines.push(line);
                }
            }
            if (wordFound) {
                data = updatedLines.join('\n');
                fs.writeFileSync(dictionaryFile, data);
                console.log('Word and meaning removed successfully from the dictionary!');
            } else {
                console.log('Word not found in the dictionary.');
            }
        } catch (err) {
            console.error('Error while removing word and meaning from the dictionary :', err.message);
        }
        displayMenu();
    });
}


// main funtion of the program...

function main() {
    displayMenu();
    rl.on('line', (input) => {
        switch (input.trim()) {
            case '1':
                addWordAndMeaning();
                break;
            case '2':
                searchWordMeaning();
                break;
            case '3':
                removeWordAndMeaning();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please choose a valid option.');
                displayMenu();
        }
    });
}

main();
