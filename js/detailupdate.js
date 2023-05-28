const delete_images = [];

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    article_id = urlParams.get('article_id');

    beforeArticle(article_id);
}

// 취소버튼
function backhHistory() {
    window.history.back();
}

// 기존 데이터 가져오기
async function beforeArticle(article_id) {
    let article_data = null;
    const response = await fetch(`${backend_base_url}/${article_id}/`,
    )

    if (response.status == 200) {
        const response_json = await response.json()
        article_data = response_json;
    } else {
        alert(response.status)
    }

    document.getElementById("title").value = article_data.title;
    document.getElementById("content").value = article_data.content;

    // 이미지 가져와서 미리보기
    const articleImage = document.getElementById("article-image")

    // 다중이미지 불러오는 코드
    if (article_data.images) {
        for (let i = 0; i < article_data.images.length; i++) {
            const image = article_data.images[i];
            const imageURL = backend_base_url + image.image.replace(/\"/gi, "")

            const imageBox = document.createElement('div');
            imageBox.setAttribute("id", "imageBox")

            const imageElement = document.createElement('img')
            imageElement.setAttribute("src", imageURL)
            imageElement.setAttribute("class", "img-fluid")
            imageElement.setAttribute("width", "100")
            imageElement.setAttribute("height", "100")

            // 이미지 삭제버튼생성
            const deleteImage = document.createElement('button');
            deleteImage.setAttribute("type", "button")
            deleteImage.setAttribute("class", "btn-close")
            const image_id = image.id
            deleteImage.setAttribute("onclick", `deleteImage(${image_id})`)

            imageBox.appendChild(imageElement);
            imageBox.appendChild(deleteImage);

            articleImage.appendChild(imageBox.cloneNode(true))
        }
    }
    return article_data
}

// x버튼함수
async function deleteImage(image_id) {

    delete_images.push(image_id)
    console.log(delete_images)
    const deleteButton = event.target // 왜 취소선이 생길까? 
    const imageBox = deleteButton.parentNode
    imageBox.style.visibility = "hidden"

}

// 게시글 수정
async function updateArticle() {
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

    if (delete_images.length > 0) {
        formdata.append('delete_images', JSON.stringify(delete_images))
    } else {
        formdata.append('delete_images', '[]')
    }

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/${article_id}/`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )
    if (response.status == 200) {
        alert("게시글이 수정되었습니다")
        window.history.back();
    } else {
        alert("제목을 입력해주세요")
    }
}