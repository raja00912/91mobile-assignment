const express = require('express')
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require('./db/connect');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static("build"));

const { register } = require('./controllers/user.controller');


app.get("/", (req, res) => {
    res.send({ message: "Hello" });
})

app.post("/user/register", async (req, res) => {
    const body = req.body;
    try {
        const user = await register(body);
        return res.send({
            data: user
        })
    } catch (error) {
        if (error.message == 'User already exists') {
            return res.status(400).send({
                error: error.message
            })
        }
        else {
            return res.status(500).send({
                error: 'Something went wrong'
            })
        }
    }
})


connect().then(() => {
    console.log("connected to db")
    app.listen(5000, () => {
        console.log("listening in 5000");
    })
}).catch((err) => { console.log("error : ", err) })

