const http = require('http');
const fs = require('fs');
const path = require('path');

fs.readFiel = fs.readFile;

const srever = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/home') {
    fs.readFiel(path.join(__dirname, 'home.html'), 'utf8', (err, dataa) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dataa);
      }
    });
  } else if (req.url === '/about') {
    fs.readFiel(path.join(__dirname, 'about.html'), 'utf8', (err, dataa) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dataa);
      }
    });
  } else if (req.url === '/contact') {
    fs.readFiel(path.join(__dirname, 'contact.html'), 'utf8', (err, dataa) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dataa);
      }
    });
  } else {
    fs.readFiel(path.join(__dirname, '404.html'), 'utf8', (err, dataa) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(dataa);
      }
    });
  }
});

srever.listen(3000, () => {
  console.log("Serevr runing on port 3000!");
});
