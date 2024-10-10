
const express = require("express")
const {User,Admin,Course} = require("../db")
const {authenticateJwt, generateJwt, secretkey } = require("../middleware/auth")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const app = express();
const router = express.Router();


router.post('/signup', async (req, res) => {
     const admin = req.body;
     
     const exist_amdin = await Admin.findOne({username:admin.username});
     if(exist_amdin){ 
       res.status(403).json({msg:"admin already exists"});
     }else{ 
       
    //    const obj = { username: username, password: password };
       const newAdmin = new Admin(admin);
      //  console.log(newAdmin);
       await newAdmin.save() 
       const token = generateJwt(admin,"admin");
       res.json({msg:"admin created successfully", token})
     }
   
});

router.post('/login', async (req, res) => {
     const {username , password} = req.body;
     const admin = await Admin.findOne({username,password}) 
     if(admin){  
        const token = generateJwt(admin,"admin")
        res.status(200).json({msg:"logged in successfully", token})
     }else{ 
         res.status(401).json({msg:"wrong password or username"})
     }
     
}); 

router.get('/me',authenticateJwt, (req, res) => {

  res.json({username:req.user.username})

});


router.post('/courses',authenticateJwt, async(req, res) => { 
  if (req.user.role !== 'admin') {
    console.log("you reached")
    return res.status(403).json({ message: "Forbidden: You don't have admin rights" });
}
       const course = new Course(req.body);
        await course.save(); 
       res.json({message:"course created successfully",courseid:course.id}) 
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
     const course = await Course.findByIdAndUpdate(req.params.courseId,req.body, {new:true})
     
     if(course){ 
       res.json({msg:"course updated successfully"})
     }else{ 
       res.status(404).json({msg:"course not found"})
     }
})

router.get('/course/:courseId', authenticateJwt, async (req, res) => { 
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId); 
    res.json({course})  
    
})



router.get('/courses' , authenticateJwt,  async (req, res) => {
     const course = await Course.find({})
    res.json({course})
});



module.exports = router;
