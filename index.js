
const express = require('express');
const { resolve } = require('path');
const data = require('./data.json')

const app = express();
const port = 5000;
app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold' , (req, res) => {
  const {threshold} = req.body;
  if (typeof threshold !== 'number'){
  return res.status(400).json({message: "Bad Request"})
  }

  const studentData = data.filter((e) => e.total > threshold);

   res.json({
    count: studentData.length,
    students: studentData.map((e) => ({
      name: e.name,
      total: e.total
    })),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});