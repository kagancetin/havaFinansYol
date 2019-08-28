const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();


global.havaData;
global.finansData;

const havaService = require("./helper/hava.js");
const finansService = require("./helper/finans.js");

var getFinans = async function () {

    var a = await finansService.getFinansData((data) => {
        if (data != false) {
            console.log("finans bilgileri güncellendi");
            global.finansData = data;
        }
    });
}
getFinans();
var getHava = async function () {

    const data = havaService.havaDataForCity("Istanbul", g => {
        console.log("havadurumu bilgileri güncellendi");
        global.havaData = g;
    });

}
getHava();
var refrClock = setInterval(getHava, 1800000);
var refrClock2 = setInterval(getFinans, 300000);


const index = require("./router/index.js");

//? Middleware'lerimiz
app.use(helmet());
app.set('views', path.join(__dirname, '/view'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.disable("etag");

app.use(logger("dev"));

//? Router'larımız
app.use("/", index);


//Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //Respond to ourselves
    console.error(err);
});


const port = app.get("port") || 3000;
app.listen(port, () => {
    console.log("Server is running on " + port + " port!");
})