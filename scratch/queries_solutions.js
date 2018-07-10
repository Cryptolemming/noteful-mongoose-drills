'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

const { printBuilder } = require('../utils/helpers');

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
	// count the number of documents using Note.countDocuments()
	printBuilder('Count the number of documents');

	return Note.countDocuments();
  })
  .then(result => {
  	console.log(result + '\n\n');
  })
  .then(() => {
	  // find notes with _id greater than "000000000000000000000007"
	  // using Note.find()
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
	// and "000000000000000000000017" inclusive using Note.find()
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
	  // using Note.find()
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
	  // insert one note using Note.create()
	  printBuilder('Insert one note');

      const title = '11 reasons why cats sleep all day and stay up all night';
	  const content = 'lorem ipsum...';
	  const newNote = {};

	  if(title && content) {
		  newNote.title = title;
		  newNote.content = content;
	  };

	  return Note.create(newNote);
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	// insert two notes using Note.insertMany()
	// create() can work as well but would send multiple operations to db
	printBuilder('Insert two notes');

	const noteOne = {"title":'make more notes about dogs', "content":'lorem ipsum...'};
	const noteTwo = {"title":'cats are the best but dogs are great too', "content":'lorem ipsum...'};
	let newNotes = {};

	if(noteOne && noteTwo) {
		newNotes = [noteOne, noteTwo];
	};

	return Note.insertMany(newNotes);
  })
  .then(result => {
  	console.log(result + '\n\n');
  })
  .then(() => {
	  // update note with _id "000000000000000000000003" using Note.findByIdAndUpdate()
	  // returns the document vs Note.updateOne() which returns a change stream wrapper
	  // make sure to set the option 'new' to true to display the modified document
	  printBuilder('Update one note');

	  const id = "000000000000000000000003";
	  const title = 'new title';
	  const content = 'new content';
	  let updatedNote = {};

	  if(title && content) {
		  updatedNote.title = title;
		  updatedNote.content = content;
	  };

	  return Note.findByIdAndUpdate(id, updatedNote, { new: true });
  })
  .then(result => {
	  console.log(result + '\n\n');
  })
  .then(() => {
	// update only the title of note with _id "000000000000000000000007" using Note.findByIdAndUpdate()
	printBuilder('Update only the title field of one note');

	const id = "000000000000000000000007";
	const title = 'new title';
	let updatedNote = {};

	if(title) {
		updatedNote.title = title;
	};

	return Note.findByIdAndUpdate(id, updatedNote, { new: true });
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	  // update the title and content fields of all notes with _id greater than "000000000000000000000014"
	  // using Note.updateMany() - don't expect the modified documents - JSON.stringify() the returned change stream
	  printBuilder('Update title and content fields of all notes with _id greater than 14');

	  const id = "000000000000000000000014";
	  const title = 'new title';
  	  const content = 'new content';
	  let updatedNote = {};
	  let filter = {};

	  if(id && title && content) {
		  filter._id = { $gt: id};
		  updatedNote.title = title;
  		  updatedNote.content = content;
	  };

	  return Note.updateMany(filter, updatedNote);
  })
  .then(result => {
  	console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	// update the note with _id "000000000000000000000008" to remove only the title field
	// using Note.findByIdAndUpdate()
	printBuilder('Update Note 8 to remove title');

	const id = "000000000000000000000008";
	const filter = {};

	if(id) {
		filter.$unset = { title: 1 };
	};

	return Note.findByIdAndUpdate(id, filter, { new: true });
  })
  .then(result => {
	  console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	  // update the notes with _id less than or equal to "000000000000000000000006"
	  // to remove only the content field using Note.updateMany()
	  printBuilder('Update Notes with ids less than or equal to 6 to remove the content field');

	  const max = "000000000000000000000006";
	  const filter = {};

	  if(max) {
		  filter._id = { $lte: max };
		  filter.$unset = { content: 1 };
	  };

	  return Note.updateMany({ _id: filter._id}, { $unset: filter.$unset});
  })
  .then(result => {
	console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	// update the notes with _id less than or equal to "000000000000000000000003"
	// to remove only the title field using Note.updateMany()
	printBuilder('Update Notes with ids less than or equal to 3 to remove the title field');

	const max = "000000000000000000000003";
	const filter = {};

	if(max) {
		filter._id = { $lte: max };
		filter.$unset = { title: 1 };
	};

	return Note.updateMany({ _id: filter._id}, { $unset: filter.$unset});
  })
  .then(result => {
  console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	// remove the note with _id "000000000000000000000017" using Note.findByIdAndRemove()
	printBuilder('Remove the note with id 17');

	const id = "000000000000000000000017";

	return Note.findByIdAndRemove(id);
  })
  .then(result => {
  	console.log(result + '\n\n');
  })
  .then(() => {
	  // remove the notes with ids not less than "000000000000000000000017"
	  // by using Note.deleteMany() and $not
	  printBuilder('Remove notes with id not less than 17');

	  const id = "000000000000000000000017";
	  let filter = {};

	  if(id) {
		  filter._id = { $not: { $lt: id } }
	  };

	  return Note.deleteMany(filter);
  })
  .then(result => {
  	console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	// remove the notes with ids greater than or equal to "000000000000000000000013"
	// and contain the string "dogs" in the title using Note.deleteMany()
	printBuilder('Remove the notes with id greater than or equal 13 with "dogs" in title');

	const id = "000000000000000000000013";
	const searchTerm = 'dogs';
	let filter = {};

	if(id && searchTerm) {
		filter._id = { $gte: "000000000000000000000013" };
		filter.title = { $regex: searchTerm };
	};

	return Note.deleteMany(filter);
  })
  .then(result => {
	  console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	  // find all the notes that do not have a title field using Note.find()
	  printBuilder('Remove the notes with id greater than or equal 13 with "dogs" in title');

	  return Note.find({ title: null });
  })
  .then(result => {
	console.log(result + '\n\n');
  })
  .then(() => {
	  // remove all the notes that contain the string 'cat' in the title
	  // but not the string 'the' using Note.updateMany() and $and
	  printBuilder('Remove the notes with "cat" in the title and not "the" in the title');

	  const searchTerm = 'cat';
	  let filter = {};

	  if(searchTerm) {
		  filter.$and = [{ title: { $regex: searchTerm }}, { title: { $not: /the/ }}];
	  };

	  return Note.deleteMany(filter);
  })
  .then(result => {
	console.log(JSON.stringify(result) + '\n\n');
  })
  .then(() => {
	// find all the notes that do have a title field that does not contain
	// the string "dogs" but does assuredly have a title field using Note.updateMany()
	// $and and $exists
	printBuilder('Find all the notes that assuredly have a title field which does not contain the string "dogs"');

	const filter = {
		$and: [{ title: { $not: /dogs/ }}, { title: { $exists: true }}]
	};

	return Note.find(filter);
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
