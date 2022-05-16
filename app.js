const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs")
const notes = require("./notes");

yargs.version("1.0.0");

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note content",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a new note",
    builder: {
        title: {
            describe: "Title of note to be removed",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => {
        notes.getNotes();
    }
});

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Title to fetch specific note",
            demandOption: true,
            type: "string" 
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
});

yargs.parse();