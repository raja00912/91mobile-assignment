//loading environmental variables
require('dotenv').config()

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db/connect")
const app = express();

// mongoose model for Product collection
const { header } = require('express-validator');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Origin: Content-Type, X-Auth-Token, Origin, Authorization');
app.use(express.json());
app.use(cors());


// will log request type
app.use(morgan('tiny'));

app.use(express.static("build"));



// test route
app.get("/", (req, res) => {
    console.log("get to main route");
    res.send({ message: "main route" })
})


// connection to database - if connected then app will listen in port 5000
connect().then(() => {
    console.log("connected to mongoose")
    app.listen(4000, () => {
        console.log("listening in 4000");
    })
})

