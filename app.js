//  Npm modules first
const chalk = require('chalk')
const yargs = require('yargs')
const { removeNote } = require('./notes.js')
// Custom modulses second
const notes =require('./notes.js')

// Customising yargs version
yargs.version('1.1.0')

//  Create commands for Add, Remove, Read, List operations

// Create Add command
yargs.command({
    command:'add',
    describe: 'Add a new note!',
    // builder is used for adding options to the command (here add command)
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // The argv in this function is representing the array of arguments defined by 'builder'
        // builder creates options for commands (here for add command)
        // where the argv in yargs.argv is representing the array of arguments defines in 'yargs.command'
        // console.log('Title: ' + argv.title);
        // console.log('Body: ' + argv.body);
        notes.addNote(argv.title, argv.body);
        // Calling addNotes from object notes
    }
})
// Create Remove command
yargs.command({
    command:'remove',
    describe:'Remove a Note!',
    builder: {
        title: {
            describe: 'Title of the note to be removed.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create List command
yargs.command({
    command:'list',
    describe:'Listing all the notes!',
    handler(){
        notes.listNotes()
    }
})

// Create Read command
yargs.command({
    command: 'read',
    describe: 'Reading a note!',
    builder: {
        title: {
            describe: 'Notes to read',
            demandOption: true,
            type: 'string'
        }
        
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// For parsing the commands taken via console from user
yargs.parse()
// or use this: console.log(yargs.argv); 

