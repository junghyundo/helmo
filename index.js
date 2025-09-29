// const express = require("express");
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(3000, () => console.log("Server ready on port 3000."));

// module.exports = app;

const express = require('express');
const app = express();
const port = 3000;

// app.use(express.static());
app.use('/', express.static(__dirname+"/"));

// Home 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// About 페이지 라우트
// app.get('/detail', (req, res) => {
//   res.sendFile(__dirname + '/detail.html');
// });

// Product 페이지 라우트
// app.get('/result', (req, res) => {
//   res.sendFile(__dirname + '/result.html');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});