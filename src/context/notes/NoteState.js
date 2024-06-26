import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {
  const host = "http://localhost:5000"

  // Get all notes
  const getNotes = async () => {

    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQ4MWYwMzMxZWVlNzRjNjVhNDljMSIsImlhdCI6MTcwODQ5NjQ5MX0.YjaesSwsv--csuotnzYlUAytVYaFwKXEUGvLMetV2u8"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)

  }

  // Add a note
  const addNote = async (title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQ4MWYwMzMxZWVlNzRjNjVhNDljMSIsImlhdCI6MTcwODQ5NjQ5MX0.YjaesSwsv--csuotnzYlUAytVYaFwKXEUGvLMetV2u8"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))

  }

  // Delete a note
  const deleteNote = async (id) => {

    console.log("Deleting note " + id);
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQ4MWYwMzMxZWVlNzRjNjVhNDljMSIsImlhdCI6MTcwODQ5NjQ5MX0.YjaesSwsv--csuotnzYlUAytVYaFwKXEUGvLMetV2u8"
      },
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // #Edit a note
  const editNote = async (id, title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQ4MWYwMzMxZWVlNzRjNjVhNDljMSIsImlhdCI6MTcwODQ5NjQ5MX0.YjaesSwsv--csuotnzYlUAytVYaFwKXEUGvLMetV2u8"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  const [notes, setNotes] = useState([])

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}


export default NoteState;