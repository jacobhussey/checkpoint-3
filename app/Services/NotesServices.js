import { appState } from "../AppState.js";
import { NotesController } from "../Controllers/NotesController.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

class NotesServices {

    createNote(noteData) {
        console.log('note services', noteData);
        const newNote = new Note(noteData)
        appState.notes = [...appState.notes, newNote]
        appState.totalNotes = appState.notes.length
        saveState('notes', appState.notes)
        saveState('totalNotes', appState.totalNotes)
    }

    setActive(id) {
        const activeNote = appState.notes.find(n => n.id == id)
        appState.activeNote = activeNote
        console.log('set active service', id);
    }

    saveNote(noteSave) {
        appState.activeNote.updatedAt = new Date().toLocaleString()
        let savedNote = appState.activeNote
        savedNote.message = noteSave
        appState.emit('activeNote')
        saveState('notes', appState.notes)
    }

    deleteNote(noteId) {
        let filterArr = appState.notes.filter(n => n.id != noteId)
        appState.activeNote = filterArr
        appState.notes = filterArr
        console.log('filtering array', appState.notes);
        appState.totalNotes = appState.notes.length
        saveState('notes', appState.notes)
        saveState('activeNote', appState.activeNote)
        saveState('totalNotes', appState.totalNotes)
    }

}


export const notesServices = new NotesServices()