import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
        
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-lable">Title</label>
                    <input minLength={8} required type="text" className='form-control' id="title" name='title' value={note.title} onChange={onChange} />
                </div>


                <div className="mb-3">
                    <label htmlFor="description" className="form-lable">Description</label>
                    <input minLength={8} required autoComplete='' type="text" className='form-control' id="description" name='description'value={note.description} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-lable">Tag</label>
                    <input minLength={5} required autoComplete='' type="text" className='form-control' id="tag" name='tag'value={note.tag} onChange={onChange} />
                </div>


                <button disabled={note.title.length<8 || note.description.length<8} className='btn btn-primary' type='submit' onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default AddNote