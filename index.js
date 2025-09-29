// const express = require("express");
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(3000, () => console.log("Server ready on port 3000."));

// module.exports = app;
const express = require('express');
const app = express();
const port = 3000;

// app.use(express.static());
app.use('/', express.static(__dirname+"/public"));

// Home 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// About 페이지 라우트
// app.get('/detail', (req, res) => {
//   res.sendFile(__dirname + '/detail.html');
// });

app.get('/detail', (req, res) => {
  const selectedDate = req.query.date;
  res.sendFile(__dirname + '/detail.html');
});

app.get('/lee', (req, res) => {
  res.send(
    "<center><h1>이윤지의 사이트</h1><p>This is the Lee's page.</p><img src='/src/Always_Smile.jpg' alt="+"Lee's Avatar></center>"
  );
});
// Product 페이지 라우트
// app.get('/result', (req, res) => {
//   res.sendFile(__dirname + '/result.html');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});