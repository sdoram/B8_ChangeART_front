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

// 게시글 수정페이지로 이동
function updatePage() {
    window.location.href = `detailupdate.html?article_id=${article_id}`
}

// 게시글 상세보기 
async function loadArticles(article_id) {
    const response = await getArticle(article_id);
    // 게시글 작성자, 댓글 작성자와 현재 로그인한 사람의 id가 일치하면 추가옵션 보이고 아니면 안보이게 하기 위한 변수
    const author = response.user_id
    const currentUser = payload ? JSON.parse(payload).user_id : undefined;

    console.log(response)

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")
    const articleLikeCount = document.getElementById("article-like-count")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    articleLikeCount.innerText = "좋아요: " + response.like_count

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
    // currentUser !=undefined 그리고 author = currentUser 
    if (currentUser && author === currentUser) {
        document.getElementById("update_button").style.display = "block";
        document.getElementById("delete_button").style.display = "block";
    } else {
        document.getElementById("update_button").style.display = "none";
        document.getElementById("delete_button").style.display = "none";
    }

    // 댓글 가져오기
    const comments = response.comments
    const commentsList = document.getElementById("comment-list")
    commentsList.innerHTML = ""
    comments.forEach(comment => {
        const commentButton = comment.user_id === currentUser
            // 작성자가 본인일 때 옵션 보여주기
            ? `
            <button type="button" class="btn btn-outline-info" data-comment-id="${comment.id}" onclick="handleEditComment(${comment.id})">수정</button>

            <button type="button" class="btn btn-outline-danger" data-comment-id="${comment.id}" onclick="removeComment(${comment.id})">삭제</button>
            `
            : '';

        commentsList.innerHTML += `
        <li class="media d-flex mb-3">
            <img class="mr-3" src="" alt="프로필 이미지" width="50" height="50">
            <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.nickname}</h5>
            ${comment.content}
            ${commentButton}
            </div>
        </li>
        `
    })
}

// 좋아요
async function like() {
    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/${article_id}/like/`,
        {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 200) {
        const response_json = await response.json()
        const message = response_json.message
        alert(message)
    } else {
        alert(response.status)
    }

    location.reload()
}

// 게시글 삭제
async function removeArticle() {
    await deleteArticle(article_id)
    alert("삭제되었습니다.")
    window.location.replace(`${frontend_base_url}/index.html`);
}

// 게시글 삭제 api
async function deleteArticle() {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/${article_id}/`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 204) {
    } else {
        alert(response.status)
    }
}

// 댓글 작성
async function submitComment() {
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(article_id, newComment)
    commentElement.value = ""

    location.reload()
}

// 댓글 작성 api (json)
async function postComment(article_id, newComment) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/${article_id}/comment/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    }
    )
    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}
// 댓글 수정 인풋으로! crud 기초강의 참고 
async function handleEditComment(comment_id) {

}

// 댓글 수정 api
async function updateComment(comment_id) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/comment/${comment_id}/`,
        {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 200) {
    } else {
        alert(response.status)
    }
}


// 댓글 삭제
async function removeComment(comment_id) {
    await deleteComment(comment_id)
    alert("삭제되었습니다.")
    window.location.reload();
}

// 댓글 삭제 api
async function deleteComment(comment_id) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/comment/${comment_id}/`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 200) {
    } else {
        alert(response.status)
    }
}

