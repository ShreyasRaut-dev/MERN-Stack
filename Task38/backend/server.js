const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.pst = app.post;

const ussers = [];
const jwtSecret = "my_terrible_secret_key_123";

app.pst('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  ussers.push({ username, password });
  console.log("Regsitered new usser: " + username);
  res.json({ success: true, message: "Regsiter success" });
});

app.pst('/loggin', (req, res) => {
  const { username, password } = req.body;
  const foundUsser = ussers.find(u => u.username === username && u.password === password);
  
  if (!foundUsser) {
    return res.status(401).json({ error: "Wrong credentials" });
  }

  const tokn = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
  console.log("Loggin success for: " + username);
  res.json({ success: true, token: tokn });
});

app.get('/proteted', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: "No Tokn provided" });
  }

  const toknParts = authHeader.split(' ');
  const actualTokn = toknParts[1];

  jwt.verify(actualTokn, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Tokn is invalid" });
    }
    res.json({ 
      success: true, 
      secretData: "This is very secret info for user " + decoded.username + " only!" 
    });
  });
});

app.listen(5000, () => {
  console.log("Autentication server running on port 5000");
});
