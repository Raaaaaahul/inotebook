const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// route 1 : get all the notes using "/api/auth/getuser "
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});

// route 2 : adding notes for user "/api/auth/addnote" login is required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if some error occurs return bad request,
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  });

  router.put('/updatenote/:id',fetchuser,async (req,res)=>{

    const {title,description,tag} = req.body;
    //create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found")
    }

    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true});
    res.json(note);
  });


  //route 4 deleting notes using delete using "/api/notes/deletenote" . login required

  router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    
    //gathering and checking if the note exist for the user or not
    let note = await Notes.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found")
    }

    //allow deletion only if user owns this note 
    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been succesfully deleted", note : note});
  });
module.exports = router;
