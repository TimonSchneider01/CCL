const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./services/database.js");
// const ws = require("./services/websockets.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3000", // or your frontend origin
    credentials: true
}));


app.use("/", indexRouter);
app.use('/users', usersRouter);

function errorHandler(err, req, res, next) {
    res.render("error", {error: err});
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});
