import React from 'react';
import Exercise from './Exercise'

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id='exercises'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weights</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercises, i) => <Exercise exercises={exercises}
                    onDelete={onDelete}
                    onEdit ={onEdit}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default ExerciseList;