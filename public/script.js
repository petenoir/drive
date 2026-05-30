const fileList =
document.getElementById("fileList");

async function uploadFile() {

    const file =
        document.getElementById("fileInput").files[0];

    if(!file){
        alert("Choose a file");
        return;
    }

    const formData =
        new FormData();

    formData.append("file",file);

    formData.append(
        "upload_preset",
        "mydrive_upload"
    );

    const response =
        await fetch(
            "https://api.cloudinary.com/v1_1/dzbpeoy3y/auto/upload",
            {
                method:"POST",
                body:formData
            }
        );

    const data =
        await response.json();

    fileList.innerHTML += `
        <div class="file-card">

            <strong>
                ${file.name}
            </strong>

            <br><br>

            <a href="${data.secure_url}"
               target="_blank">

               Open File

            </a>

        </div>
    `;
}