import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        console.log("Updating note ", note);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote />

            <button style={{display:"none"}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-lable">Title</label>
                                    <input minLength={8} required type="text" className='form-control' id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-lable">Description</label>
                                    <input minLength={8} required autoComplete='' type="text" className='form-control' id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                              </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-lable">Tag</label>
                                    <input minLength={5} required autoComplete='' type="text" className='form-control' id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                                    
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<8 || note.edescription.length<8} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3 row'>
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem updateNote={updateNote} key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes