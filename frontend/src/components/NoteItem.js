import React, { useContext } from 'react';
import noteContext from "../context/Notes/NoteContext"
const NoteItem = (props) => {
    const {notes,updateNote} = props
    const context = useContext(noteContext)
    const {deleteNote} = context;
  return (
    
    
    <div className='col-md-3'> 
      <div className="card my-4" style={{width: '18rem'}}>
        <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <p className="card-text"> {notes.description}</p>
            <i className="fa-solid fa-trash mx-2" style={{color: '#de5b3b'}} onClick={()=>{deleteNote(notes._id)}}></i>
            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(notes)}} style={{color: '#16a75c'}}></i>
        </div>
     </div>
    </div>
  );
}

export default NoteItem;
