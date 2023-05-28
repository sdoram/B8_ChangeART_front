
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

        const response_json = await response.json()
        const article_id = response_json.article_id

        window.location.href = `${frontend_base_url}/doc/detail.html?article_id=${article_id}`

    } else {
        alert(response.status)
    }
}
