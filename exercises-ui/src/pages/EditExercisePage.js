import React, { useEffect, useState } from "react";
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
  Stack,
} from "@mui/material";

function toDateInputValue(d) {
  if (!d) return "";
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    if (Number.isNaN(dt.getTime())) return d; // already YYYY-MM-DD
    return dt.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function EditExercisePage({ exerciseToEdit, setExerciseToEdit }) {
  const history = useHistory();

  // Safe fallback so hooks aren't conditional
  const ex = exerciseToEdit || {
    name: "",
    reps: "",
    weight: "",
    unit: "lbs",
    date: "",
    _id: "",
  };

  // Redirect if user loads page without selecting an exercise
  useEffect(() => {
    if (!exerciseToEdit) history.replace("/");
  }, [exerciseToEdit, history]);

  const [name, setName] = useState(ex.name || "");
  const [reps, setReps] = useState(String(ex.reps ?? ""));
  const [weight, setWeight] = useState(String(ex.weight ?? ""));
  const [unit, setUnit] = useState(ex.unit || "lbs");
  const [date, setDate] = useState(toDateInputValue(ex.date));

  const isDisabled =
    !name.trim() || !reps || Number(reps) < 1 || Number.isNaN(Number(reps));

  const handleSave = async (e) => {
    e.preventDefault();

    const w = weight === "" ? 0 : Number(weight);
    const u = unit?.trim() || (w > 0 ? "kg" : "N/A");

    const edited = {
      name: name.trim(),
      reps: Number(reps),
      weight: w,
      unit: u,
      date, // YYYY-MM-DD
    };

    const res = await fetch(`/exercises/${ex._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edited),
    });

    if (res.status === 200) {
      alert("Exercise updated!");
      setExerciseToEdit?.(edited);
      history.push("/");
    } else {
      const txt = await res.text();
      alert(`Failed to update (status ${res.status}). ${txt}`);
    }
  };

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
          sx={{ mb: 3, fontWeight: 600, color: "#f8bcd0", letterSpacing: ".5px" }}
        >
          Edit Exercise
        </Typography>

        <Box component="form" onSubmit={handleSave}>
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

          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isDisabled}
              sx={{
                flex: 1,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: "#f8bcd0",
                color: "#4a4a4a",
                "&:hover": { backgroundColor: "#f9c8d9" },
              }}
            >
              Save Changes
            </Button>

            <Button
              variant="outlined"
              onClick={() => history.push("/")}
              sx={{ flex: 1, borderRadius: 2 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
