const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('client'));

app.post('/upload_json', (req, res) => {
  console.log(req.body)
  res.send(req.body);
  res.end();
});