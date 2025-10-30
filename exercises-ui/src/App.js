import "./App.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import EditExercisePage from "./pages/EditExercisePage";


// ✅ MUI imports
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        {/* new app bar  */}
        <AppBar position="sticky" 
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #b8e0c8 0%, #a8d5ba 100%)",
          color: "#ffffff",
          boxShadow: "none",
        }}
        >
          <Toolbar>
           
        <IconButton 
        component={Link}
        to='/'
        sx={{
          color: "#7a4a86",
          mr: 2,
          "&:hover": {
            backgroundColor: "rgba(248, 188, 208, 0.2)",
            transition: "0.3s",
          },
        }}
          >
          <HomeIcon fontSize="large" />
          </IconButton>
            
            <Typography variant="h3" 
            sx={{ 
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: "2px", 
            }}>
              WORKOUT TRACKER
            </Typography>


            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              href="/add-exercise"
              sx={{ textTransform: "none" }}
            >
              New Workout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main content inside a centered Container */}
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercises">
            <EditExercisePage
              exerciseToEdit={exerciseToEdit}
              setExerciseToEdit={setExerciseToEdit}
            />
          </Route>
        </Container>

        {/* themed footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            textAlign: "center",
            color: "text.secondary",
            borderTop: "1px solid",
            borderColor: "divider",
            mt: "auto",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Marisela Vasquez — Workout Tracker
          </Typography>
        </Box>
      </Router>
    </div>
  );
}

export default App;
