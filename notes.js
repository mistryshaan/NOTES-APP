const fs = require("fs");
const chalk = require("chalk")

const getNotes = () => {
    console.log(loadNotes());
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);

    if(note) {
        console.log(`${chalk.blue.inverse.bold(title)}: ${note.body}`);
    } else {
        console.log(chalk.red.bold("Note doesn't exists!"));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({title, body});
        saveNotes(notes);
        console.log(chalk.bold.blue("Note added successfully!"));
    } else {
        console.log(chalk.bold.red("Note already exists!"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const updatedNotes = notes.filter(note => note.title !== title);

    if(updatedNotes.length !== notes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.bold.blue("Note removed successfully!"));
    } else {
        console.log(chalk.bold.red("Note doesn't exists!"));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync("notes.json", JSON.stringify(notes));
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    readNote
};