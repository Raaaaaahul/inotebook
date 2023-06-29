import React ,{useContext,useEffect} from 'react'
import noteContext from "../context/Notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';


function Notes() {
    const context = useContext(noteContext);
    const {notes,getNotes} = context;
    useEffect(() => {
      getNotes();
    },[]);

    const updateNote=(note)=>{
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      ...
    </div>
    }

  return (
    <>
    <AddNote/>
    <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((notes)=>{
            return <NoteItem key={notes._id} notes={notes} updateNote={updateNote}/>
        })}
      
    </div>
    </>
  )
}

export default Notes
