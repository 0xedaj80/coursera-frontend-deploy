import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const setUser = 
  const setUser = useSetRecoilState(userState)

  return (
    <div>
      <div>
        <Grid
          container
          style={{
            padding: "5vw",
            borderRadius: 20,
            backgroundColor:"white",
            height:"94vh"
          }}
        >
          
          <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
            <div style={{ borderRadius: 20 }}>
              <img
                src={"/signin.jpg"}
                width={"100%"}
                style={{ borderRadius: 20 }}
              />
            </div>
          </Grid>

          <Grid lg={6}>
            <div style={{ marginTop: 100, padding:30 ,display:"flex",justifyContent:"center"}}>
              <Typography
                style={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                  width:300,
                  color:"blue",
                  

                }}
                variant={"h5"}
              >
                welcome back please signin
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  width: "400px",
                  padding: "40px",
                  borderRadius: "20px",
                }}
              >
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="username"
                  variant="outlined"
                  type={"text"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
                <br />
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  type={"password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br /> <br />
                <Button
                  size={"large"}
                  variant="contained"
                  onClick={async () => {
                    const response = await axios.post(
                      "https://coursera-backend-deploy-api.vercel.app/admin/login",
                      {
                        username: email,
                        password: password,
                      }
                    );

                    const data = response.data;
                    alert(data.msg);
                    localStorage.setItem("token", data.token);
                    // window.location = "/";
                    setUser({
                      isLoading:false,
                      userEmail:email
                    }) 
                    navigate("/")
                     
                  }}
                >
                  signin
                </Button>
              </Card>
            </div>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Signin;
