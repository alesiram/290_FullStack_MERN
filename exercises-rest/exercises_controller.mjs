import * as exercise from './exercises_model.mjs';
import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());

/**
 * Create a new exercise with the name, age and email and phone number provided in the query parameters
 */
app.post("/exercises", (req, res) => {
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request failed' });
        });
});

/**
 * Retrive ALL exercises. 
 */
app.get("/exercises", (req, res) => {
    exercise.findExercises(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(200).json(exercise);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ error: 'Request failed' });
    });
});

/**
 * Update using PUT the exercise whose _id is provided and set its 
 * the values provided in the query parameters
 */
 app.put("/exercises/:_id", (req, res) => {
    exercise.updateExercise(req.params._id, req.body)
        .then(result => {
            if (result !== null) {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(500).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

/**
 * Delete the movie whose _id is provided in the query parameters
 */
 app.delete("/exercises/:_id", (req, res) => {
    exercise.deleteById(req.params._id)
        .then(result => {
            if (result === 1) {
                res.status(204).send();
            }else {
                res.status(500).json({Error: 'Resources not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});