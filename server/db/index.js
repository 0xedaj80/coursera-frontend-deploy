const mongoose = require("mongoose");


// defining schemas 
const amdinSchema = new mongoose.Schema({
     username:String,
     password:String
  });

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    author:String,
  });

// defining mongoose models
const Admin = mongoose.model("Admin", amdinSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
    Admin,
    User,
    Course 
}