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
    `
        <h3>Upload Successful</h3>

        <a href="${data.secure_url}" target="_blank">
            Open File
        </a>

        <br><br>

        <textarea rows="4" cols="50">
${data.secure_url}
        </textarea>
    `;
}