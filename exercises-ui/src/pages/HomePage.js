import React from 'react';
import ExerciseList from '../components/ExerciseList';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';




function Homepage({setExerciseToEdit}) {

    const [exercises, setExercise] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            setExercise(exercises.filter( m => m._id !== _id));
        }else {
            console.error(`Failed to delete a exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercises => {
        setExerciseToEdit(exercises);
        history.push('/edit-exercises');
    }

    const loadExercise = async() => {
        const response = await fetch('/exercises');
        const data = await response.json();
        console.log(data)
        setExercise(data);
    }


    useEffect(() => {
        loadExercise();        
    }, []);
    
    return (
        <>
        <main>
        
         </main>  
         <article className = "App-article">
         <h6>Your recent workouts: </h6> 
         <ExerciseList exercises={exercises} onDelete= {onDelete} onEdit={onEdit}></ExerciseList>
        
         </article>
            
        </>
    );
}

export default Homepage;