import { Card, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function Addcourse(){
  const [title, setTitle] = useState();
  const [description, setDescription] = useState(); 
  const [imageurl, setimageurl] = useState();
  const [price, setPrice] = useState();




  const [userEmail, setuserEmail] = useState();


  useEffect(  ()=>{


   const fetchUserData = async () => {
     try {
       const response = await axios.get("https://coursera-backend-deploy-api.vercel.app/admin/me", {
         headers: {
           "Authorization": "Bearer " + localStorage.getItem("token"),
         },
       });
       setuserEmail(response.data.username); // Update state with user email
     } catch (error) {
       console.error("Error fetching user data", error);
     }
   };

   // Call the async function
   fetchUserData();


 }, [])

   if(userEmail){
    return (
      <div>
       <Graytopper2 title={"CREATE A NEW COURSE"}></Graytopper2> 

       


    <div style={{ display:"flex", justifyContent:"center", paddingTop:200}}>
    <Card  style={{ width:600,padding:"20px", borderRadius:20}}>
    <TextField
    onChange={(e)=>{
      setTitle(e.target.value)
    }}
    fullWidth={true}
    id="outlined-basic"
    label="title"
    variant="outlined"
    type={"text"}/>       
     <br /> <br /> 
   <TextField
    onChange={(e)=>{
      setDescription(e.target.value)
    }}
    fullWidth={true}
    id="outlined-basic"
    label="description"
    variant="outlined"
    type={"text"} />
    <br /><br />
     <TextField
      onChange={(e)=>{
      setimageurl(e.target.value)
    }}
    fullWidth={true}
    id="outlined-basic"
    label="image-url"
    variant="outlined"
    type={"text"} />
    <br /><br />
    <TextField
     onChange={(e)=>{
      setPrice(e.target.value)
    }}
    fullWidth={true}
    id="outlined-basic"
    label="Price"
    variant="outlined"
    type={"text"} />
    <br /><br />
    
   <Button size={"large"} variant="contained"
   onClick={()=>{
     fetch("https://coursera-backend-deploy-api.vercel.app/admin/courses",{
       method:"POST",
       body:JSON.stringify({
         title,
         description,
         imageLink:imageurl,
         published:true,
         price,
         author:userEmail
         
       }),
       headers:{
         "content-type":"application/json",
         "Authorization":"Bearer " +localStorage.getItem("token")
       }
     }).then((resp)=>{
        resp.json().then((data)=>{
          alert(data.message)
        })
     })
   }} 
   
   >create course</Button>
   
  </Card>   
  
  </div>
    </div>
    
   ) 
   }
    return (
       <div>
        <Graytopper2 title={"YOU ARE LOGGED OUT"}></Graytopper2> 

     </div>
     
    )
}


function Graytopper2(props){ 
  return (
    <div style={{height:"250px",background:"#212121", width:"100vw",top:1, zIndex:"0", marginBottom:"-250px"}}>
       <div style={{display:"flex", justifyContent:"center", height:"250px", flexDirection:"column"}}>
          <div>
             <Typography style={{color:"white", fontWeight:"600"}} variant="h3" textAlign={"center"}>
                {props.title}
             </Typography>
          </div>
       </div>
    </div>
  ) 
}

export default Addcourse;
