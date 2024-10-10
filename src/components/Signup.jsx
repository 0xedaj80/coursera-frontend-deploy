import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios"


function Signup(){ 
  const navigate = useNavigate();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();

    return ( 
  <div>

  
    <div style={{
        paddingTop:"200px",
        marginBottom:"5px",
        display:"flex",
        justifyContent:"center"
    }}>
     <Typography style={{border:"2px solid black",borderRadius:"10px", padding:"10px"}} variant={"h5"}>
        welcome back please signup
     </Typography> 
    </div>
  
  
  <div style={{ display:"flex", justifyContent:"center"}}> 
  <Card  style={{
    width:"400px",
    padding:"20px",
    borderRadius:"20px"
  }}>

    <TextField 
     fullWidth={true}
     label="username"
     variant="outlined"
     type={"text"}  
     onChange={(e)=>{
      setEmail(e.target.value)
     }} 
     />
    <br /><br />
    <TextField 
    fullWidth={true} 
    label="password" 
    variant="outlined" 
    type={"password"}
     onChange={(e)=>{
      setPassword(e.target.value)
     }} 
    />
    <br /> <br /> 
    <Button size={"large"} variant="contained" onClick={()=>{
         fetch("https://coursera-backend-deploy-api.vercel.app/admin/signup",{
                 method:"POST",
                 body:JSON.stringify({
                  username:email,
                  password:password
                }),
                headers:{
                  "content-type":"application/json"
                }
         }).then((resp)=>{
           resp.json().then((data)=>{
            localStorage.setItem("token",data.token)
            navigate("/")
           })
         })   

    }}>signup</Button>
    </Card>
    </div>
    
   </div>
   ) 
} 


export default Signup;