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

// async function updateCourse(id) {
//     const result = await Course.update({ _id: id }, {
//         $set: {
//             author: 'Mosh',
//             isPublished: false
//         }
//     });

    // async function updateCourse(id) {
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Jason',
    //         isPublished: false
    //     }
    // }, { new: true });

    // console.log(course);


//      async function removeCourse(id) {
//    const result = await Course.deleteOne({ _id: id });
//    console.log(result);
//}

     async function removeCourse(id) {
  // const result = await Course.deleteMany({ _id: id });
   const course = await Course.findByIdAndRemove(id);
   console.log(course);
}


removeCourse('5e0cadcc3c87fa66cc81ac9e');

// UPDATED VERSION







// Classes, objects
// Course, nodeCourse

