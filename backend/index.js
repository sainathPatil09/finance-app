import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import incomeRoute from "./Routes/income.route.js";
import expenseRoute from "./Routes/expense.route.js";
import totalRoute from "./Routes/total.route.js";
import fileupload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path'

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());
app.use(cors());

// app.use(cors({
//   origin:process.env.FRONTEND_URL,
//   credentials:true,
// })
// );

const port = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

try {
  mongoose.connect(URI);
  console.log("connected to MONGODB");
} catch (error) {
  console.log(error);
}

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.use("/api/users", userRoute);
app.use("/api/users", incomeRoute);
app.use("/api/users", expenseRoute);
app.use("/api/finance", totalRoute);


const generate =async (prompt)=>{
  try {
      
      const result = await model.generateContent(prompt);
      // console.log(result.response.text())
      return result.response.text()
  } catch (error) {
      console.log(error)
  }
}
generate()


app.get("/api/users/", async (req, res) => {
  try {
    const { question } = req.query;
    // console.log(question)

    const result = await generate(question);
    res.send({ result: result });
  } catch (error) {
    res.send(400).json({ error: "Error in bot" });
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});


// ================  code for deployment  =====================
if(process.env.NODE_ENV === 'production'){
  const dirPath = path.resolve();

  app.use(express.static("./frontend/dist"))
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"));
  })
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
