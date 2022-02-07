const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Note = require("../models/notes");
const checkAuth = require('../middleware/check-auth');


router.get("/",  checkAuth, (req, res, next) => {
    Note.find()
      .select("title details _id category")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          notes: docs.map(doc => {
            return {
              title: doc.title,
              details: doc.details,
              category: doc.category,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:4000/notes/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.post("/",  checkAuth, (req, res, next) => {
    const note = new Note({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      details: req.body.details,
      category: req.body.category 
    });
    note
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created note successfully",
          createdNote: {
              title: result.title,
              details: result.details,
              category: result.category,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:4000/notes/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.get("/:noteId", checkAuth, (req, res, next) => {
    const id = req.params.noteId;
    Note.findById(id)
      .select('title details _id category')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              note: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:4000/notes'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.patch("/:noteId", checkAuth, (req, res, next) => {
    const id = req.params.noteId;
    let updateOps = {};
    updateOps = {...req.body}
    Note.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Note updated",
          request: {
            type: "GET",
            url: "http://localhost:4000/notes/" + id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
router.delete("/:noteId",  checkAuth, (req, res, next) => {
    const id = req.params.noteId;
    Note.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Note deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:4000/notes',
                body: { title: 'String', category: 'String' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
module.exports = router;