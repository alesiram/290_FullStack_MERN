import * as exercise from "./exercises_model.mjs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/**
 * Create a new exercise
 */
app.post("/exercises", (req, res) => {
  exercise
    .createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((newExercise) => {
      res.status(201).json(newExercise);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: "Request failed" });
    });
});

/**
 * Retrieve ALL exercises
 */
app.get("/exercises", (req, res) => {
  exercise
    .findExercises()
    .then((allExercises) => {
      res.status(200).json(allExercises);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: "Request failed" });
    });
});

/**
 * Update exercise by id
 */
app.put("/exercises/:_id", (req, res) => {
  exercise
    .updateExercise(req.params._id, req.body)
    .then((result) => {
      if (result !== null) {
        res.json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Request failed" });
    });
});

/**
 * Delete exercise by id
 */
app.delete("/exercises/:_id", (req, res) => {
  exercise
    .deleteById(req.params._id)
    .then((result) => {
      if (result === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Request failed" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
