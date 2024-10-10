require("dotenv").config()
const express = require('express');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());



app.use("/admin", adminRouter)
app.use("/users", userRouter)

async function main(){
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "course-selling" });
  app.listen(3000, () => {
  console.log('Server is listening on port 3000');
  });

}

main()
 
             

