const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.gt = app.get;

const mongoUri = "mongodb://localhost:27017/scehmarefrance";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MonogoDB for Scehma Refrance!"))
  .catch(err => console.log("Fechting mongo eror: " + err));

const usserScehma = new mongoose.Schema({
  name: String,
  email: String
});

const UsserModel = mongoose.model('Usser', usserScehma);

const potsScehma = new mongoose.Schema({
  title: String,
  content: String,
  usser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usser'
  }
});

const PotsModel = mongoose.model('Pots', potsScehma);

app.post('/users', (req, res) => {
  const newUsser = new UsserModel({
    name: req.body.name,
    email: req.body.email
  });
  newUsser.save()
    .then(savedUsser => res.json(savedUsser))
    .catch(err => res.status(500).json({ error: "Eror saving usser" }));
});

app.post('/posts', (req, res) => {
  const newPosst = new PotsModel({
    title: req.body.title,
    content: req.body.content,
    usser: req.body.usserId
  });
  newPosst.save()
    .then(savedPosst => res.json(savedPosst))
    .catch(err => res.status(500).json({ error: "Eror saving pots" }));
});

app.gt('/posts', (req, res) => {
  PotsModel.find().populate('usser')
    .then(potss => res.json(potss))
    .catch(err => res.status(500).json({ error: "Fechting posts eror" }));
});

app.get('/users', (req, res) => {
  UsserModel.find()
    .then(ussers => res.json(ussers))
    .catch(err => res.status(500).json({ error: "Fechting ussers eror" }));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
