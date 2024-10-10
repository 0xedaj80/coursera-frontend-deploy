import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { TextField, Card, Button } from "@mui/material";
import { Loading } from "./Loading";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { courseState } from "../store/atoms/course";
import { courseAuthor, courseDescription, coursePrice, courseTitle, isCourseLoading } from "../store/selectors/course";

function Course() {
  const { courseId } = useParams();
  const setcourses = useSetRecoilState(courseState)
  const courseLoading = useRecoilValue(isCourseLoading) 
  
  // console.log("course");

  useEffect(() => {
    fetch("https://coursera-backend-deploy-api.vercel.app/admin/course/" + courseId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setcourses({
          isLoading:false,
          course:data.course
    
        });
        console.log(data.course)
      });
    }).catch(e=>{
       setcourses({
        isLoading:false,
        course:null
       })
      })
    



  }, []);

  if(courseLoading){
     return (
      <Loading></Loading>
     )
  }

  return (
    <div>
      <Graytopper ></Graytopper>

      <Grid container >
        <Grid item lg={8} md={12} sm={12}>
          <Updatecard ></Updatecard>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Coursetable ></Coursetable>
        </Grid>
      </Grid>
    </div>
  );
}

function Graytopper() {

   const title = useRecoilValue(courseTitle)
   const author = useRecoilValue(courseAuthor)
  

  return (
    <div
      style={{
        height: "250px",
        background: "#212121",
        width: "100vw",
        top: 0,
        zIndex: "0",
        marginBottom: "-250px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "250px",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: "600" }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
          <Typography
            style={{ color: "red", fontWeight: "600" }}
            variant="h6"
            textAlign={"center"}
          >
            Author: {author}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function Coursetable() {
  const title = useRecoilValue(courseTitle)
  const description = useRecoilValue(courseDescription);
  const price = useRecoilValue(coursePrice)


  console.log("course-table");

  return (
    <div
      style={{
        
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
          marginTop:50
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography textAlign={"center"} variant="h5">
            {title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle1">
            {description}
          </Typography>
          <br />

          <Typography textAlign={"center"} variant="h4">
            {price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function Updatecard() {
 
  const [courseDetails, setCourse ] = useRecoilState(courseState)
  

  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(courseDetails.course.description);
  const [price, setPrice] = useState(courseDetails.course.price);
  

  
  console.log(title);

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      }}>
      <Card 
       variant="outlined" 
      style={{
         borderRadius: 20,

          maxWidth:600,
          marginTop:200,
          width:"100%"
         }}>
        <div style={{ padding: 20 }}>
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            UPDATE COURSE
          </Typography>
          <TextField
            value={title}
            onChange={(e) => {
              const val = e.target.value;
              setTitle(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="title"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            value={description}
            onChange={(e) => {
              const val = e.target.value;
              setDescription(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="description"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              setPrice(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
              fetch("https://coursera-backend-deploy-api.vercel.app/admin/courses/" + courseDetails.course._id ,{
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: "nothing",
                  published: true,
                  price: price,
                }),
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then((resp) => {
                resp.json().then((data) => {
                  let Updatedcourse = {
                    _id: courseDetails.course._id,
                    title: title,
                    description: description,
                    imageLink: "nothing",
                    price,
                    author:courseDetails.course.author,
                  };

                  setCourse({
                    course:Updatedcourse,
                    isLoading:false
                  })
                  // alert("course updated")
                });
              });
            }}
          >
            update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Course;

