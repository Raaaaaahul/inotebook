import React ,{useContext,useEffect,useRef, useState} from 'react'
import noteContext from "../context/Notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


function Notes() {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    useEffect(() => {
      if(localStorage.getItem('token'))
      {
        getNotes();
      }
      else{
        navigate('/login')
      }
      
      //eslint-disable-next-line
    },[]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const handleClick=(e)=>{
      e.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      // AddNote(note.etitle,note.edescription,note.etag)
    }

    const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
    <AddNote/>
          <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" minLength={5} required onChange={onChange} value={note.etitle}/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">description</label>
              <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' minLength={5} required onChange={onChange}/>
            </div>
          <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag}/>
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5 }>update note</button>
            </div>
          </div>
        </div>
      </div>
    <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container mx-4'>
          {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((notes)=>{
             return <NoteItem key={notes._id} notes={notes} updateNote={updateNote}/>
        })}
      
    </div>
    </>
  )
}

export default Notes
