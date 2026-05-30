const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>My Drive</title>
</head>
<body>

<h1>My Drive</h1>

<input type="file" id="fileInput">

<button onclick="uploadFile()">
    Upload
</button>

<br><br>

<div id="result"></div>

<script>
async function uploadFile() {

    const file =
        document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Choose a file first");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        "mydrive_upload"
    );

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzbpeoy3y/auto/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    document.getElementById("result").innerHTML =
        \`
        <h3>Upload Successful</h3>

        <a href="\${data.secure_url}" target="_blank">
            Open File
        </a>

        <br><br>

        <textarea rows="4" cols="80">\${data.secure_url}</textarea>
        \`;
}
</script>

</body>
</html>
    `);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});