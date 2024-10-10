import { Grid, Grid2, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailstate } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SchoolIcon from "@mui/icons-material/School";
function Landing() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailstate);
  const isLoading = useRecoilValue(isUserLoading);
  return (
    <div style={{ backgroundColor: "#eeeeee" }}>
      <Grid
        container
        style={{ padding: "5vw", backgroundColor: "#d0d8e6", borderRadius: 20 }}
      >
        <Grid lg={6}>
          <div style={{ marginTop: 100, padding: 30 }}>
            <Typography variant={"h2"}>Launch your,</Typography>
            <Typography variant={"h2"}>Course in Seconds.</Typography>

            <Typography variant={"h4"} style={{ color: "#5dade2" }}>
              Turn your expertise into income,
            </Typography>
            <Typography variant={"h4"} style={{ color: "#2e86c1" }}>
              while changing lives.
            </Typography>
            {!userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ borderRadius: 20 }}
                    onClick={() => {
                      navigate("/signup");
                    }}
                    startIcon={<VpnKeyIcon></VpnKeyIcon>}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ borderRadius: 20 }}
                    onClick={() => {
                      navigate("/signin");
                    }}
                    startIcon={<LoginIcon></LoginIcon>}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
            {userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    startIcon={<AddCircleIcon></AddCircleIcon>}
                    size={"large"}
                    variant={"contained"}
                    style={{ borderRadius: 10, backgroundColor: "#34495e" }}
                    onClick={() => {
                      navigate("/addcourse");
                    }}
                  >
                    create course
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ borderRadius: 10, backgroundColor: "#34495e" }}
                    onClick={() => {
                      navigate("/courses");
                    }}
                    startIcon={<SchoolIcon></SchoolIcon>}
                  >
                    view courses
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <div style={{ borderRadius: 20 }}>
            <img
              src={"/Coursera.jpg"}
              width={"100%"}
              style={{ borderRadius: 20 }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            margin: 30,
            borderRadius: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 100,
            }}
          >
            <div style={{ padding: 10 }}>
              <img
                src={"./ibm.png"}
                style={{ borderRadius: 20, width: 300 }}
                alt=""
              />
            </div>
            <div style={{ padding: 10 }}>
              <img src={"./michigan.png"} style={{ width: 300 }} alt="" />
            </div>
            <div style={{ padding: 10 }}>
              <img
                src={"./google.png"}
                style={{ width: 300, borderRadius: 20 }}
                alt=""
              />
            </div>
            <div style={{ padding: 10 }}>
              <img src={"./duke.png"} style={{ width: 300 }} alt="" />
            </div>
            <div style={{ padding: 10 }}>
              <img src={"./illions.png"} style={{ width: 300 }} alt="" />
            </div>
          </div>
        </div>
      </Grid>
      <Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#d59999",
            margin: 10,
            borderRadius: 20,
            height: 500,
          }}
        >
          <Typography variant="h2" style={{ padding: 200 }}>
            About us
          </Typography>
        </div>
      </Grid>
    </div>
  );
}

export default Landing;
