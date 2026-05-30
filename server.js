const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>My Drive</title>
            </head>
            <body>
                <h1>My Drive</h1>
                <p>Welcome to my cloud storage website.</p>

                <input type="file">
                <button>Upload</button>
            </body>
        </html>
    `);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});