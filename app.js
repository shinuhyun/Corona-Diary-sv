const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/auth.config");
const port = process.env.PORT || 5000;
const morgan = require("morgan");

const authMiddleware = require("./middlewares/auth.js");
const userRouter = require("./routes/user");
const mypageRouter = require("./routes/mypage");
const contentRouter = require("./routes/content");
const commentRouter = require("./routes/comment");
const contentListRouter = require("./routes/contentList");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://corona-diary.s3-website.ap-northeast-2.amazonaws.com"],
    method: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// print the request log on console
app.use(morgan("dev"));

// set the secret key variable for jwt
app.set("jwt-secret", config.secret);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/", authMiddleware);
app.use("/mypage", mypageRouter);
app.use("/content", contentRouter);
app.use("/comment", commentRouter);
app.use("/", contentListRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
