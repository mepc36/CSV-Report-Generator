// Specifications:

// 1.) The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of 
// CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.

// 2.) You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, 
// all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not 
// contain the same properties. In all cases, every property you encounter must be present in the final CSV output.

// 3.) You may also assume that child records in the JSON will always be in a property called `children`.

// Instructions:

// Specifications:
// 1.) Use express to serve up an index.html file and its assets