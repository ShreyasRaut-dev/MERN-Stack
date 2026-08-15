const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = "mongodb+srv://student:student123@cluster0.mongodb.net/workoutbudyyy?retryWrites=true&w=majority";

mongoose.connect(mongoUri)
  .then(() => console.log("Atlas connected"))
  .catch(err => console.log("Atlas error: " + err));

app.use('/api/workouts', workoutRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
