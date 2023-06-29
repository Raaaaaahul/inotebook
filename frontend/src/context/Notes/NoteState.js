import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const host = "http://localhost:5000"
    const notesIntial =[]
    const [notes,setNotes] = useState(notesIntial);  

    //getAllNotes
    const getNotes= async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzAwODU1MTQ1ZmIyNmVmNjgxMjU1In0sImlhdCI6MTY4Nzg1Njg4NH0.gNqWDRQyuSwyVFLP_BLgrdprcyggXZGvTXeEpdCfzhE'
        },
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }


    //ADD A NOTE
    const addNote = async (title,description,tag) => {
      const response = await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzAwODU1MTQ1ZmIyNmVmNjgxMjU1In0sImlhdCI6MTY4Nzg1Njg4NH0.gNqWDRQyuSwyVFLP_BLgrdprcyggXZGvTXeEpdCfzhE'

        },
        body:JSON.stringify({title,description,tag})
      });
        let note =
        {
            "_id": "649aedbd98921bf789190d0z",
            "user": "649300855145fb26ef681255",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-27T14:10:05.047Z",
            "__v": 0
          }    
        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) =>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzAwODU1MTQ1ZmIyNmVmNjgxMjU1In0sImlhdCI6MTY4Nzg1Njg4NH0.gNqWDRQyuSwyVFLP_BLgrdprcyggXZGvTXeEpdCfzhE'
        }
      })

      const json = response.json();
      console.log(json)

      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id,title,description,tag)=>{
      //API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzAwODU1MTQ1ZmIyNmVmNjgxMjU1In0sImlhdCI6MTY4Nzg1Njg4NH0.gNqWDRQyuSwyVFLP_BLgrdprcyggXZGvTXeEpdCfzhE'

        },
        body:JSON.stringify({title,description,tag})
      });
      const json = response.json();
      //logic for editing 
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id)
        {
          element.title = title
          element.description = description
          element.tag = tag
        }
        
      }

    }

    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;