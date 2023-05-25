
// 게시글작성 api (formdata)

async function createArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const images = document.getElementById("image").files;

    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)

    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            formdata.append('image', image);
        }
    } else {
        formdata.append('image', '');
    }

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/newpost/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )
    if (response.status == 200) {
        alert("작성완료")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }
}

function showFileName() {
    const input = document.getElementById("image");
    const fileName = document.getElementById("file-name");
    fileName.textContent = input.files.name;
}

