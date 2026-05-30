const fileList =
document.getElementById("fileList");

const statusDiv =
document.getElementById("status");

async function uploadFile() {

    const file =
    document.getElementById("fileInput").files[0];

    if (!file) {

        alert("Please choose a file.");

        return;
    }

    statusDiv.innerHTML =
    "Uploading...";

    const formData =
    new FormData();

    formData.append(
        "file",
        file
    );

    formData.append(
        "upload_preset",
        "mydrive_upload"
    );

    try {

        const response =
        await fetch(
            "https://api.cloudinary.com/v1_1/dzbpeoy3y/auto/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data =
        await response.json();

        statusDiv.innerHTML =
        "✅ Upload Successful";

        fileList.innerHTML =
        `
        <div class="file-card">

            <div class="file-name">
                ${file.name}
            </div>

            <div class="actions">

                <a
                    href="${data.secure_url}"
                    target="_blank">

                    Open File

                </a>

                <button
                    class="copy-btn"
                    onclick="copyLink('${data.secure_url}')">

                    Copy Link

                </button>

            </div>

        </div>
        ` + fileList.innerHTML;

    }
    catch(error){

        console.error(error);

        statusDiv.innerHTML =
        "❌ Upload Failed";
    }
}

function copyLink(url){

    navigator.clipboard.writeText(url);

    alert("Link copied!");
}