const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "My notes here..."
};

// To add a note

const addNote =(title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) =>  note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    };
    
};

// To remove a note
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length ) {
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found having this title!'))
    }
    saveNotes(notesToKeep)
}

// To list all the notes
const listNotes = () => {
    console.log(chalk.magentaBright.inverse("--------------------------------Your Notes---------------------------------"))
    const notes = loadNotes()
    for (let note of notes){
        console.log(note.title)
    }
    for (let k in notes) {
        console.log( notes[k])
    }
    notes.forEach((note) => {
        console.log(note)
    })
}

// To read a note
const readNote = (title) => {
    const notes = loadNotes()
    const note= notes.find((note) => note.title === title) 

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

// To save the notes ( this function is called inside addNotes function to save the added note and also this will create a notes.json if there is none)
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// To load in the existing notes if any
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}