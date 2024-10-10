const express = require("express");
const { authenticateJwt, generateJwt ,generateJwtuser, authenticateJwtuser } = require("../middleware/auth");
const {User,Course} = require("../db/index")



const router = express.Router();




// User routes
router.post('/signup', async (req, res) => {

    const user = req.body;
    console.log("signup")
    const exist_user = await User.findOne({username:user.username}); 
    if(exist_user){ 
      res.status(401); 
    }else{  
       const newuser = new User(user); 
       const a = await newuser.save()
      
       let token = generateJwtuser(user,"user");
       res.json({msg:"user created successfully", token})

    }
    
});

router.post('/login',async (req, res) => { 
  console.log("you eneterd bitch")
    const {username, password } = req.body;
    
    const user = await User.findOne({username,password})

    console.log(user)

    
    if(user){ 

         const token = generateJwtuser(user,"user");
         
         res.json({msg:"user logged in successfully", token}) 
    }else{ 
         res.sendStatus(404);
    }
  
});


router.get("/me", authenticateJwtuser, (req,res)=>{
     res.json({username:req.user.username}) 
})

router.get('/courses', authenticateJwtuser, async (req, res) => {
        const course = await Course.find({published:true});
        res.json({course}) 
});

router.post('/courses/:courseId',authenticateJwtuser, async (req, res) => {

        const courseId = req.params.courseId;
        
        const course = await Course.findById(courseId)

	if(course){ 
           const user = await User.findOne({username:req.user.username})
           if(user){ 
               user.purchasedCourses.push(course);
               await user.save();
              res.json({msg:"course purchased successfully"})
           }else{ 
            res.json({msg:"user not found "})
           } 
        }else{ 
          res.status(404).json({msg:"course not found or not available"});  
        } 
});

router.get('/purchasedCourses', authenticateJwtuser, async (req, res) => {
    const user = User.findOne({username:req.user.username})
    if(user){ 
     res.json({purchasedcourses:user.purchasedCourses || []})
    }else{ 
       res.status(404).json({msg:"user not found"});
    }   

});


module.exports = router
