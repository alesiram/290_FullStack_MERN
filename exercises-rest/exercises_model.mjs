// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database myFristDatabase "exercise" _db in the MongoDB server running locally on port 27017
mongoose.connect(
    // 'mongodb+srv://mvsquz:FRESNO@cs290.njtrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    // new cluster added to mongodb
    'mongodb+srv://vasquem2:jNhSw3gpdJeyYSCM@cluster0.lyggw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true }
);



// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: {type: Date, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema. mongoose will generate a class based on the schema. 
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create a exercise 
 * @param {Date} name
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit
 * @param {Date} date 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */

 /* Create a exercise function, returns promise becuase it is async*/
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB. save is called on an instance of exercise 
    return exercise.save();
}

/** 
 * Retrive all exercises w/ no params or body
 */
const findExercises = async () => {
    const query = Exercise.find()
    return query.exec();
}


/**
 * Update a exercise's info
 * @param {String} _id
 * @param {Number} fieldsToUpdate 
 * @returns A promise. Resolves to the number of documents modified
 */
const updateExercise = async (_id, fieldsToUpdate) => {
    const result = await Exercise.findOneAndUpdate({ _id: _id }, fieldsToUpdate);
    return result
}


/**
 * Delete the exercise with provided id
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount
}

export { createExercise, findExercises, updateExercise, deleteById };