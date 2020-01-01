const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength:255,
        // match: /pattern/
},
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'], 
        lowercase: true, 
        //uppercase: true,
        trim: true
    },


    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now }, 
    isPublished: Boolean, 
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10, 
        max: 200, 
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
const course = new Course({
    name: 'Angular Course',
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend'], 
    isPublished: true,
    price: 15.8
});

try {
    const result = await course.save();
    console.log(result);
}
catch (ex) {
    for (field in ex.errors)
        console.log(ex.errors[field].message);
    }
}


async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    

    const courses = await Course
                                .find({ _id: '5e0cadcc3c87fa66cc81ac9e'})
                                // .skip((pageNumber - 1) * pageSize)
                                // .limit(pageSize)
                                .sort({ name: 1 })
                                .select({ name: 1, tags: 1, price});
                            console.log(courses[0].price);
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


getCourses();

// UPDATED VERSION







// Classes, objects
// Course, nodeCourse

