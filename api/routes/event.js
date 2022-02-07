const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Event = require("../models/event");
const checkAuth = require('../middleware/check-auth');


router.get("/",  checkAuth, (req, res, next) => {
    Event.find()
      .select("title start _id end")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          events: docs.map(doc => {
            return {
              title: doc.title,
              start: doc.start,
              end: doc.end,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:4000/event/" + doc._id
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
  
  router.post("/", checkAuth,  (req, res, next) => {
    const event = new Event({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      start: req.body.start,
      end: req.body.end 
    });
    event
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created event successfully",
          createdEvent: {
              title: result.title,
              start: result.start,
              end: result.end,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:4000/event/" + result._id
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
  
  router.get("/:eventId", checkAuth, (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
      .select('title start _id end')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              event: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:4000/event'
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
  
  router.patch("/:eventId", checkAuth,  (req, res, next) => {
    const id = req.params.eventId;
    let updateOps = {};
    updateOps = {...req.body}
    Event.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Event updated",
          request: {
            type: "GET",
            url: "http://localhost:4000/event/" + id
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
  
router.delete("/:eventId", checkAuth,  (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Event deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:4000/event',
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