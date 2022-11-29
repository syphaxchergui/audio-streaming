import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mongoose from "./database/gridfs-service.js";
import bodyParser from "body-parser";

dotenv.config();

const port = process.env.PORT || 5000;
const url = process.env.URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.all("*", (req, res) => {
  throw new Error("Bad request");
});

app.use((err, req, res, next) => {
  if (err.message === "Bad request") {
    res.status(400).json({ error: { message: err.message, stack: err.stack } });
  }
});

//Server listening
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

// Connect to mongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection to ${url}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose default connection error : ${err}`);
});

mongoose.connection.on("disconnect", () => {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed");
    process.exit(0);
  });
});
