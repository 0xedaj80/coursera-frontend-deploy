import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Courses from "./Courses";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailstate } from "../store/selectors/userEmail";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Appbar({}) {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailstate);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "#e4e3e3",
            borderRadius: 20,
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              variant={"h5"}
              style={{
                color: "#004ed6",
                fontWeight: "bold",
                border: "2px solid",
                borderRadius: 10,
                padding: 2,
              }}
            >
              COURSERA{" "}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Button
                startIcon={<AccountCircleIcon />}
                variant={"contained"}
                style={{ borderRadius: "10px", backgroundColor: "#d56c56" }}
              >
                {userEmail}
              </Button>
            </div>
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Button
                startIcon={<AddCircleIcon></AddCircleIcon>}
                variant={"contained"}
                style={{ borderRadius: "10px", backgroundColor: "#34495e" }}
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                add course
              </Button>
            </div>
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Button
                startIcon={<SchoolIcon></SchoolIcon>}
                variant={"contained"}
                style={{ borderRadius: "10px", backgroundColor: "#34495e" }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                courses
              </Button>
            </div>
            <div>
              <Button
                startIcon={<LogoutIcon />}
                variant={"contained"}
                style={{ borderRadius: "20px", backgroundColor: "red" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  // window.location = "/"
                  // setuserEmail(null)
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                  navigate("/");
                }}
              >
                logout
              </Button>
            </div>
          </div>
        </div>

        {/* <div>
        <Courses></Courses>
      </div> */}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#e4e3e3",
          borderRadius: 20,
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography
            variant={"h5"}
            style={{
              color: "#004ed6",
              fontWeight: "bold",
              border: "2px solid",
              borderRadius: 10,
              padding: 2,
            }}
          >
            COURSERA{" "}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              marginRight: "10px",
            }}
          >
            <Button
              variant={"contained"}
              style={{ borderRadius: "20px" }}
              onClick={() => {
                navigate("/signin");
              }}
              startIcon={<LoginIcon></LoginIcon>}
            >
              signin
            </Button>
          </div>
          <div>
            <Button
              startIcon={<VpnKeyIcon />}
              variant={"contained"}
              style={{ borderRadius: "20px" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
