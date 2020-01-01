const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [ String ], 
    date: { type: Date, default: Date.now }, 
    isPublished: Boolean, 
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
const course = new Course({
    //name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'], 
    isPublished: true,
    price: 15
});

const result = await course.save();
console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    

    const courses = await Course
                                .find({ author: 'Mosh', isPublished: true})
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({ name: 1 })
                                .count();
    console.log(courses)
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
   //});

}

updateCourse();

// UPDATED VERSION







// Classes, objects
// Course, nodeCourse

