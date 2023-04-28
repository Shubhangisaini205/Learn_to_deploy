const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/Note.model")

noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save();
        res.status(200).send({ "msg": "New Note has been added" })

    } catch (error) {
        console.log(error)
        res.status(400).send({ "err": error.message })
    }
})


noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({authorId:req.body.authorId})
        res.status(200).send(notes)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "err": error.message })
    }
})


noteRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params;
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorId !== note.authorId){
            res.status(200).send({ "msg":"you are not authorised to do this action"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.send({ "msg": `The note with id:${noteID} has been updated` })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})


noteRouter.delete("/delete/:noteID", async(req, res) => {
    const { noteID } = req.params;
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorId !== note.authorId){
            res.status(200).send({ "msg":"you are not authorised to do this action"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID},req.body)
        res.send({ "msg": `The note with id:${noteID} has been deleted` })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

module.exports = {
    noteRouter
}
// 644a9da072e0e1950481f24d by silencer