const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
    const course = await Course.findById(courseId);
    course.author.name = 'Mosh Hamedani';
    course.save();
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId)
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('5e0cadcc3c87fa66cc81ac9e', '5e0e2fdb3dba8b26081eeea4')
