'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

const printColorFormat = '\x1b[36m%s\x1b[0m';

const printBuilder = (text) => {
	console.log(printColorFormat,
				'####################################################\n' +
				text + '\n' +
				'####################################################\n');
};

mongoose.connect(MONGODB_URI)
  .then(() => {
	  // find all the notes using Note.find()
	  printBuilder('Find all the notes');

	  return Note.find();
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // find all the notes using Note.find() with a condition to select only
	  // for title and content fields (_id will be included by default)
	  printBuilder('Find all the notes selecting for title field');

	  return Note.find({}, 'title');
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // find all the notes using Note.find() selecting for the title field value of
	  // '5 life lessons learned from cats'
	  printBuilder('Find all the notes with the title \'5 life lessons learned from cats');

	  const searchTerm = '5 life lessons learned from cats';
	  let filter = {};

	  if(searchTerm) {
		  filter.title = { title: searchTerm };
	  }

	  return Note.find(filter.title);
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // find the first 5 notes using Note.find()
	  printBuilder('Find the first 5 notes');

	  const limit = 5;
	  let filter = {};

	  if(limit) {
		  filter.limit = limit;
	  }

	  return Note.find({}, null, filter);
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // find the next 5 notes using Note.find() after skipping the first 5
	  printBuilder('Find the first 5 notes after skipping the first 5');

	  const limit = 5;
	  const skip = 5;
	  let filter = {};

	  if(limit && skip) {
		  filter.condition = { skip, limit };
	  }

	  return Note.find({}, null, filter.condition);
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	// count the number of documents
	printBuilder('Count the number of documents');

	return Note.countDocuments();
  })
  .then(result => {
  	console.log(result + '\n\n');
  })
  .then(() => {
	  // find notes with _id greater than "000000000000000000000007"
	  printBuilder('Find the notes with _id greater than 7');

	  const id = "000000000000000000000007";
	  let filter = {};

	  if (id) {
		  filter._id = { $gt: id };
	  };

	  return Note.find(filter);
  })
  .then(result => {
  	console.log(result + '\n\n');
  })
  .then(() => {
	// find notes with _ids between "000000000000000000000009"
	// and "000000000000000000000017" inclusive
	printBuilder('Find the notes with _id between 9 and 17 inclusive');

	const idStart = "000000000000000000000009";
	const idFinish = "000000000000000000000017";
	let filter = {};

	if (idStart && idFinish) {
		filter._id = { $gte: idStart, $lte: idFinish };
	};

	return Note.find(filter);
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // find notes with _ids less than or equal to "000000000000000000000007"
	  printBuilder('Find the notes with _id less than or equal to 7');

	  const id = "000000000000000000000007";
	  let filter = {};

	  if (id) {
		  filter._id = { $lte: id };
	  };

	  return Note.find(filter);
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	  // find one note using Note.findOne()
	  printBuilder('Find one note');

	  return Note.findOne();
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	// find one note using Note.findOne() and display only the title
	printBuilder('Find one note and display only the title');

	return Note.findOne({}, 'title');
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	  // insert one note using
	  printBuilder('Find one note and display only the title');

	  return Note.findOne({}, 'title');
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
