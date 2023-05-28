
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

    const response_json = await response.json() // post의 return값에서 변환한 이미지의 id 가져오기 
    const get_response = await fetch(`${backend_base_url}/change/${response_json}`, {
    }) // 변환한 이미지의 id를 이용해서 ChangePostView에 get요청
    const get_response_json = await get_response.json() // get요청에서 변환된 이미지 가져오기 
    console.log(get_response_json)
    const after_image = document.getElementById("after_image")
    after_image.setAttribute("src", `${backend_base_url}${get_response_json.after_image}`) // after_image html에 붙여넣기 

}

// 이미지 파일 변환
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


//이미지 파일 저장
async function downloadImage() {

    const imageData = new FormData()
    imageData.append("before_image", file)
    const response = await fetch(`${backend_base_url}/change/`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        method: 'POST',
        body: imageData
    })

    const response_json = await response.json() // post의 return값에서 변환한 이미지의 id 가져오기 
    const get_response = await fetch(`${backend_base_url}/change/${response_json}`, {
    }) // 변환한 이미지의 id를 이용해서 ChangePostView에 get요청
    const get_response_json = await get_response.json() // get요청에서 변환된 이미지 가져오기


    axios({
        url: `${backend_base_url}${get_response_json.after_image}`,
        method: 'GET',
        responseType: 'blob'
    })
        .then((response) => {
            const url = window.URL
                .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

}











