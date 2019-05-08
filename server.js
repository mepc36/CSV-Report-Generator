const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('client'));

app.post('/upload_json', (req, res) => {
  var flatArray = [];
  var flatString = "";

  var parsed = JSON.parse(req.body.data);

  // Transform a nested object into a flattened string that lists the shared values of 
  // every key in chronological order.

  // I. — an object
  // O. — a string that looks like: 
  // firstName,lastName,county,city,role,sales,\n,Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000,Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000,\n, [etc.]
  // C. — 
  // E. — 
  
  // parsed — OBJECT
  // req.body.data — STRING

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
  
  res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(flatString);
});
