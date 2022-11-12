import { generateId } from "../Utils/generateId.js";

export class Note {
    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.createdAt = new Date()
        this.updatedAt = data.updatedAt || this.createdAt
        this.message = data.message || ''
        this.colorPicker = data.colorPicker
    }


    get NoteslistTemplate() {
        return `
        <div onclick ="app.notesController.setActive('${this.id}')">
        <h3 style="color:${this.colorPicker}" class="mdi mdi-pencil selectable">${this.name}</h3>
        </div>
        `
    }

    get ActiveNoteTemplate() {
        return `
        <div class="col-md-3 mx-md-5 text-center text-light">
          <h1>${this.name}<i style="color:${this.colorPicker}" class="mdi mdi-pencil ms-2"></i></h1>
          <p>Created on ${this.createdAt.toLocaleDateString()}</p>
          <p class="updatedAt">Updated at ${this.updatedAt.toLocaleString()}</p>
        </div>
        <div class="col-md-5 mb-5">
        <div><button class="btn btn-primary" onclick="app.notesController.saveNote()"><i class="mdi mdi-content-save"></i></button>
        <button onclick="app.notesController.deleteNote('${this.id}')" class="btn btn-danger"><i class="mdi mdi-delete text-white"></i></button>
        </div>
        <textarea name="" id="" cols="85" rows="15" class="message" placeholder="type whatever your heart desires...">${this.message}</textarea>
        </div>
        `
    }


}