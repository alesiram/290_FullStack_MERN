// src/pages/CreateExercisePage.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function CreateExercisePage() {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  const history = useHistory();

  // ✅ Add this line: use your environment variable or fallback
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // normalize values
    const w = weight === "" ? 0 : Number(weight);
    const u = unit?.trim() || (w > 0 ? "kg" : "N/A");

    const newExercise = {
      name: name.trim(),
      reps: Number(reps),
      weight: w,
      unit: u,
      date,
    };

    try {
      // ✅ use the full API URL here
      const res = await fetch(`${API_BASE}/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      if (res.status === 201) {
        alert("Exercise added successfully!");
        history.push("/");
      } else {
        const txt = await res.text();
        alert(`Failed to add exercise (status ${res.status}). ${txt}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error while adding exercise.");
    }
  };

  const isDisabled =
    !name.trim() || !reps || Number(reps) < 1 || Number.isNaN(Number(reps));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: "0 6px 18px rgba(168,213,186,.18)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#f8bcd0",
            letterSpacing: ".5px",
          }}
        >
          Add Exercise
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Exercise Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />

          <TextField
            label="Reps"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ min: 0 }}
            required
          />

          <TextField
            label="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ min: 0 }}
            helperText="Leave blank for bodyweight"
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              label="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="lbs">lbs</MenuItem>
              <MenuItem value="kgs">kgs</MenuItem>
              <MenuItem value="count">count</MenuItem>
              <MenuItem value="min">minutes</MenuItem>
              <MenuItem value="laps">laps</MenuItem>
              <MenuItem value="mi">mi</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={isDisabled}
            sx={{
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "#f8bcd0",
              color: "#4a4a4a",
              "&:hover": { backgroundColor: "#f9c8d9" },
            }}
          >
            Add Exercise
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
