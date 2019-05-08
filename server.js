const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.static('client'));

app.post('/upload_json', (req, res) => {
  var flatArray = [];
  var flatString = "";

  var parsed = JSON.parse(req.body.data);

  var getKeys = function(getKeys) {
    for (var key in getKeys) {
      if (key !== 'children') {
        flatString += key + ',';
      }
    }
    flatString += '\n'
  }

  var getValues = function(needValues) {
    for (var keys in needValues) {
      if (typeof needValues[keys] !== "object") {
        flatString += needValues[keys] + ',';
      }
    }
    flatString += '\n';
    if (needValues.children.length === 0) {
      return;
    } else {
      for (var i = 0; i < needValues.children.length; i++) {
        getValues(needValues.children[i]);
      }
    }
  }

  getKeys(parsed);
  getValues(parsed);

  fs.writeFile('test.csv', flatString, (error) => {
    if (error) {
      throw error
    } else {
      console.log('Saving file!')
    }
  })
  
  res.setHeader('Content-disposition', 'attachment; filename=report.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(flatString);
});

app.get('/download', (req, res) => {
  fs.readFile('test.csv', function(error, data) {
    if (error) {
      console.log('error', error)
    } else {
      console.log('Sending file back!');
      res.setHeader('Content-disposition', 'attachment; filename=report.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(data);
    }
  });
})
