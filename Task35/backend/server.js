const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todolist_task35")
  .then(() => console.log("MonogoDB connected"))
  .catch(err => console.log("Monogo connection eror: " + err));

app.use('/api', routes);

app.listen(5000, () => {
  console.log("Server runs on port 5000");
});
