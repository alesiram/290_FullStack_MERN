import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";

export default function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // use env first, then localhost
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
  console.log("API_BASE in HomePage =", API_BASE);

  // Load workouts
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/exercises`);
        const data = await res.json();
        setExercises(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [API_BASE]);

  // Delete workout
  const onDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;
    const res = await fetch(`${API_BASE}/exercises/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      setExercises((prev) => prev.filter((e) => e._id !== id));
    } else {
      console.error(`Failed to delete exercise ${id} (status ${res.status})`);
    }
  };

  // Edit workout
  const onEdit = (ex) => {
    setExerciseToEdit(ex);
    history.push("/edit-exercises");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Summary
  const totalWorkouts = exercises.length;
  const totalReps = exercises.reduce(
    (sum, e) => sum + (Number(e.reps) || 0),
    0
  );
  const maxWeight =
    exercises.length > 0
      ? Math.max(...exercises.map((e) => Number(e.weight) || 0))
      : 0;

  return (
    <Box sx={{ mt: 3 }}>
      {/* Summary Cards*/}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Workouts
              </Typography>
              <Typography variant="h4">{totalWorkouts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Reps
              </Typography>
              <Typography variant="h4">{totalReps}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Heaviest Weight
              </Typography>
              <Typography variant="h4">
                {maxWeight} {maxWeight > 0 ? "kg" : "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* -Data Table- */}
      <Paper sx={{ mt: 5, overflow: "hidden" }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((ex) => (
                <TableRow key={ex._id} hover>
                  <TableCell>{ex.name}</TableCell>
                  <TableCell>{ex.reps}</TableCell>
                  <TableCell>{ex.weight ?? 0}</TableCell>
                  <TableCell>{ex.unit || "N/A"}</TableCell>
                  <TableCell>
                    {ex.date ? new Date(ex.date).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="Edit"
                      onClick={() => onEdit(ex)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      aria-label="Delete"
                      onClick={() => onDelete(ex._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {exercises.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No workouts yet — click <strong>New Workout</strong> to add one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
