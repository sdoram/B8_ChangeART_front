window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    article_id = urlParams.get('article_id');
    loadArticles(article_id);
}

// 게시글 상세보기 api
async function getArticle(article_id) {
    const response = await fetch(`${backend_base_url}/${article_id}/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 메인페이지에서 게시글 클릭하면 상세페이지로 이동하는 함수
function articleDetail(article_id) {
    window.location.href = `${frontend_base_url}/doc/detail.html?article_id=${article_id}`
}

// http://127.0.0.1:5500/doc/detail.html?article_id=12

// 게시글 상세보기 
async function loadArticles(article_id) {
    const response = await getArticle(article_id);
    console.log(response)

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content

    const imageElement = document.createElement('img');

    // 다중이미지 불러오는 코드
    if (response.images) {
        for (let i = 0; i < response.images.length; i++) {
            const image = response.images[i];
            const imageURL = backend_base_url + image.image.replace(/\"/gi, "")
            imageElement.setAttribute("src", imageURL)
            imageElement.setAttribute("class", "img-fluid")
            articleImage.appendChild(imageElement.cloneNode(true))
        }
    }

    // 게시글 작성자와 현재 로그인한 사람의 id가 일치하면 수정삭제 보이고 아니면 안보임
    const author = response.user_id
    const currentUser = payload ? JSON.parse(payload).user_id : undefined;

    // currentUser !=undefined 그리고 author = currentUser 
    if (currentUser && author === currentUser) {
        document.getElementById("update_button").style.display = "block";
        document.getElementById("delete_button").style.display = "block";
    } else {
        document.getElementById("update_button").style.display = "none";
        document.getElementById("delete_button").style.display = "none";
    }
}