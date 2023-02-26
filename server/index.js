const express = require('express');
const app = express();
const port = 3000;

const users = [
  { name: 'Boby', age: 15 },
  { name: 'Mike', age: 20 },
  { name: 'Artur', age: 25 },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});



app.get('/users', (req, res) => {
    res.json(users);
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  