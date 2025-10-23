import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import {useState} from 'react';
import Navigation from './components/Navigation.js'
import { CgGym } from "react-icons/cg";



function App() {
  const[exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
      <header>
      <h1>Workout Tracker </h1>  
        <CgGym size={59}className="icons" />
          {/*<img src={logo} className="icons" alt="logo" />*/}
          
        </header>
        <Navigation />

        
        <div className='App-header'>
          <Route path='/' exact>
             <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path='/add-exercise'>
            <CreateExercisePage />
          </Route>
          <Route path='/edit-exercises'>
            <EditExercisePage exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <footer>
          {<p>Last modified on March 11th, 2022. &copy; Marisela Vasquez.</p> }
        </footer>
        </div>
      </Router>
    </div>
  );
}

export default App;
