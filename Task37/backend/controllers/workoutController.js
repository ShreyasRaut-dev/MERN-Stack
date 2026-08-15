const Workout = require('../models/workoutModel');

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch" });
  }
};

const createWorkout = async (req, res) => {
  const title = req.body.title;
  const load = req.body.load;
  const reps = req.body.reps;

  if (!title || !load || !reps) {
    return res.status(400).json({ error: "Fields are empty" });
  }

  try {
    const workout = new Workout({ title, load, reps });
    await workout.save();
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Workout.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Could not delete" });
  }
};

module.exports = { getWorkouts, createWorkout, deleteWorkout };
