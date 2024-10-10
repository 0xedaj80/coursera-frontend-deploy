import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography , Button} from "@mui/material";
import { red } from "@mui/material/colors";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

function Courses() {
  
  const [courses, setcourses] =  useState([]);

  useEffect(() => {
    fetch("https://coursera-backend-deploy-api.vercel.app/admin/courses/" , {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setcourses(data.course);
      });
    });
  }, []);

  if(!courses){
     return (
      <Loading></Loading>
     ) 
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      
    >
      
      {/* {courses} */}
      {courses.map((value) => {
        return <Coursecard course={value}></Coursecard>;
      })}
    </div>
  );
}

function Coursecard(props) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: "10px",
        width: "300px",
        minHeight: "200px",
        padding:"10px",
        borderRadius:20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
      <Typography  variant="subtitle1" style={{marginLeft:100 , color:"red"}}>
         Author: {props.course.author} </Typography>
      
      <br />
      <Typography textAlign={"center"} variant="h4">
        RS:{props.course.price}
      </Typography>

      <div style={{display:"flex", justifyContent:"center" , marginTop:"10px", }}> 
        <Button size={"large"} variant="contained" onClick={() => {
              //  window.location = "/course/"+ props.course._id
               navigate("/course/"+ props.course._id) 
        }}
        startIcon={<EditIcon />}
        style={{borderRadius:40}}
        >
          edit
        </Button>
         <Button style={{marginLeft:10, borderRadius:40}} size={"large"} variant="contained" onClick={() => {
               window.location = "/course/"+ props.course._id 
        }}>
          delete
        </Button>
                  



      </div>
      
    </Card>
  );
}

export default Courses;
