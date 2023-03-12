const express = require('express')
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require('./db/connect');

const fs = require('fs')
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static("build"));

const { register, login, getUser } = require('./controllers/user.controller');


// app.get("/", (req, res) => {
//     res.send({ message: "Hello World" });
// })

app.post("/user", async (req, res) => {
    try {
        let data = await getUser(req.body.id)
        console.log("data");
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ Error: err });
    }
})

app.post("/register", async (req, res) => {
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

app.post('/login', async (req, res) => {
    const body = req.body

    try {
        const data = await login(body);

        return res.status(200).send({ token: data.token, user: data.user })
    } catch (error) {
        if (error.message == 'User does not exist' || error.message == 'The password is incorrect') {
            return res.status(400).send({
                error: error.message
            })
        } else {
            return res.status(500).send({
                error: error + 'Something went wrong'
            })
        }
    }
})

const storage = multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})

app.use('/profile', express.static('upload/files'));

app.post("/upload", upload.single('file'), (req, res) => {
    res.send({
        success: true,
        profile_url: `http://localhost:5000/profile/${req.file.filename}`,
        name: req.file.filename
    })
})

app.delete("/delete/:file", async (req, res) => {
    let file = req.params
    // console.log(file.file);
    try {
        fs.unlinkSync(`./upload/files/${file.file}`)
        res.status(200).send({ message: "File deleted successfully" })
    } catch (err) {
        res.status(500).send("Error - " + err)
    }

})



function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

app.use(errHandler);

connect().then(() => {
    console.log("connected to db")
    app.listen(5000, () => {
        console.log("listening in 5000");
    })
}).catch((err) => { console.log("error : ", err) })

