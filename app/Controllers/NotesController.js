import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesServices } from "../Services/NotesServices.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { saveState } from "../Utils/Store.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawNotesList() {
    let template = ''
    appState.notes.forEach(n => template += n.NoteslistTemplate)
    setHTML('notes-list', template)
}

function _drawNote() {
    if (appState.activeNote) {
        let note = appState.activeNote
        setHTML('new-note', note.ActiveNoteTemplate)
    }
    else {
        setHTML('new-note', "No active notes")
    }
}

function _drawTotalNotes() {
    let totalNotes = appState.totalNotes
    console.log(totalNotes, 'totalNotes');
    setHTML('total-notes', totalNotes)
}


export class NotesController {
    constructor() {
        // console.log('notes controller');
        appState.on('notes', _drawNotesList)
        appState.on('activeNote', _drawNote)
        appState.on('totalNotes', _drawTotalNotes)
        _drawNotesList()
        _drawTotalNotes()
    }


    createNote() {
        window.event.preventDefault()
        console.log('creating note');
        const form = window.event.target
        let noteData = getFormData(form)
        console.log(noteData);
        notesServices.createNote(noteData)
        form.reset()
    }

    setActive(id) {
        // console.log('setting active', id);
        notesServices.setActive(id)
    }

    saveNote() {
        let noteSave = document.querySelector('.message',)
        console.log(noteSave.value);
        notesServices.saveNote(noteSave.value)
    }

    async deleteNote(noteId) {
        if (await Pop.confirm('DELETE this note FOREVER?')) {
            notesServices.deleteNote(noteId)
        }
    }



}