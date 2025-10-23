import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit, setExerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            alert("Successfully edited a exercise")
        } else{
            alert(`Failed to edit a exercise, status code = ${response.status}`);
        }
        history.push("/");
    };
    
    return (
        <div className='editPage'>
            <h2>Edit Exercise</h2>
            <input
                className='customInput'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)} />


            <input
                className='customInput'
                type='number'
                value={reps}
                onChange={e => setReps(e.target.value)} />

             <input
                className='customInput'
                type='number'
                label="hi"
                value={weight}
                onChange={e => setWeight(e.target.value)} />

             <select 
                className='customInput' 
                value={unit} 
                onChange={e => setUnit(e.target.value) }>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                    <option value="miles">miles</option>
             </select>

            <input
                className='customInput'
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)} />

            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}; 


export default EditExercisePage;