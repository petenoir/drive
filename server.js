const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

app.get("/", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>My Drive</title>
        </head>
        <body>
            <h1>My Drive</h1>

            <form
                action="/upload"
                method="POST"
                enctype="multipart/form-data">

                <input type="file" name="myfile">

                <button type="submit">
                    Upload
                </button>

            </form>

        </body>
        </html>
    `);
});

app.post(
    "/upload",
    upload.single("myfile"),
    (req, res) => {

        res.send(`
            <h2>Upload Successful</h2>

            <p>
                ${req.file.originalname}
            </p>

            <a href="/">
                Back
            </a>
        `);
    }
);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});