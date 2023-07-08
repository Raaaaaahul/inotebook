import React,{useContext,useState} from 'react'
import noteContext from "../context/Notes/NoteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""});
   
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

      <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required value={note.description}/>
      </div>

      <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' minLength={5} required onChange={onChange} value={note.tag}/>
      </div>

        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
