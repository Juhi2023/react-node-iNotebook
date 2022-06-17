const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')


router.get('/allnotes', fetchUser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ')
    }
})

router.post('/addnote', fetchUser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'description must be of atleast 5 characters').isLength({ min: 5 })], async (req, res)=>{

    try{
        const {title, description, tag} = req.body;

        //if invalidation occurs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save();
        res.json(savenote)
    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ')
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res)=>{

    try{
        const {title, description, tag} = req.body;

        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).send('Not Found');
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});

    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ')
    }
})


router.delete('/deletenote/:id', fetchUser, async (req, res)=>{

    try{
        const {title, description, tag} = req.body;


        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).send('Not Found');
        }
        //allow deletion if the user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({'success': 'deleted'});

    }catch(err){
        console.log(err.message);
        res.status(500).send('internal server error ')
    }
})


module.exports = router;