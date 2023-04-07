import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { pass as pass, db as db } from "./info.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const port = 3001;

const app = express();

//MIDDLEWARES

app.use(express.json()); //converts the data from the fontend to JSON
app.use(cors()); //helps with making api request
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  `mongodb+srv://sarthak24:${pass}@recipes.rbqyqck.mongodb.net/${db}?retryWrites=true&w=majority`
);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
