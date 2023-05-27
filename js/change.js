
// 이미지 업로드
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file;

/* ---------------------------------------------------------------------------- */


input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    showFile();
})


dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
})

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
})

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
})


function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("이미지 파일이 아닙니다.");
        dropArea.classList.remove("active");
        dragText.textContent = "드래그 하여 이미지 업로드";
    }
}

/* ---------------------------------------------------------------------------- */


// 이미지 DB 업로드
async function uploadImage() {
    const imageData = new FormData()
    imageData.append("before_image", file)

    const response = await fetch(`${backend_base_url}/change/`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        method: 'POST',
        body: imageData
    })

    if (response.status == 201) {
        // 홈페이지에 after_image 띄우기
        const getimages = await getImages()
        const after_image = document.getElementById("after_image")
        console.log(getimages)
        after_image.setAttribute("src", `${backend_base_url}${getimages.after_image}`)
        return response
    } else {
        if (file == null) {
            alert('파일을 올려주세요')
        }
    }
}

// // 이미지 파일 변환
async function transferImage() {
    const beforeImg = document.getElementById("beforeImage").value
    const response = await fetch(`${backend_base_url}/change/`, {
        headers: {
            'Authorization': token
        },
        method: 'PUT',

    })

    if (response.status == 200) {
        return response
    } else {
        alert(response.status)
    }
}












