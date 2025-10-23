import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const AddExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added a exercise")
        } else{
            alert(`Failed to add a exercise, status code = ${response.status}`);
        }
        history.push("/");
    };
    
    return (
        <div className='editPage'>
            <h2>Add Exercise</h2>
            <input
                className='customInput'
                type='text'
                placeholder='Enter exercise'
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                className='customInput'
                type='number'
                value={reps}
                placeholder='Enter reps'
                onChange={e => setReps(e.target.value)} />
             <input
                className='customInput'
                type='number'
                value={weight}
                placeholder='Enter weight'
                onChange={e => setWeight(e.target.value)} />
             <select 
                value={unit} 
                onChange={e => setUnit(e.target.value)} 
                className='customInput'>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                    <option value="mi">mi</option>
                    <option value="laps">laps</option>
                    <option value="count">count</option>
                    <option value="min">minutes</option>
             </select>
            <input
                className='customInput'
                type='date'
                placeholder='Enter date'
                value={date}
                onChange={e => setDate(e.target.value)} />
             <button
                onClick={AddExercise}
            >Add</button>
        </div>
    );
}; 

export default CreateExercisePage;