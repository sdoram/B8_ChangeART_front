const urlParams = new URL(location.href).searchParams;
const order = urlParams.get('order')
const page = urlParams.get('page')

// 정렬기준 확인
if (order) {
    currentOrder = `?order=${order}`
} else {
    currentOrder = ''
}

// 현재 페이지 확인
if (page) {
    if (order) {
        currentPage = `&page=${page}`
    } else {
        currentPage = `?page=${page}`
    }
} else {
    currentPage = ''
}

// 게시글 정렬 버튼
async function handleSortButton(btn) {
    ordering = `?order=${btn.value}`
    if (page) {
        currentPage = `&page=${page}`
    }
    location.href = `${document.location.href.split('?')[0]}${ordering}${currentPage}`
}

// 게시글 리스트 불러오기 
async function getArticles() {
    const response = await fetch(`${backend_base_url}/home/${currentOrder}${currentPage}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json.results
    } else {
        alert('게시글 로딩 실패')
    }
}

// 페이지네이션
// 이전 페이지 보기
async function previousPage() {
    const response = await fetch(`${backend_base_url}/home/${currentOrder}${currentPage}`, {
    })
    const response_json = await response.json()
    if (response_json.previous) {
        const previous = response_json.previous.split('?')[1]
        location.href = `${frontend_base_url}?${previous}`
    } else {
        alert('이전 페이지가 없습니다.')
    }
}

// 다음 페이지 보기
async function nextPage() {
    const response = await fetch(`${backend_base_url}/home/${currentOrder}${currentPage}`, {
    })
    const response_json = await response.json()
    if (response_json.next) {
        const next = response_json.next.split('?')[1]
        location.href = `${frontend_base_url}?${next}`
    } else {
        alert('다음 페이지가 없습니다.')
    }
}

// 상세 게시글 이동
function articleDetail(article_id) {
    console.log(article_id)
    window.location.href = `${frontend_base_url}/doc/detail.html?article_id=${article_id}`
}

// 각 게시글 정보 불러오기
window.onload = async function loadArticles() {
    articles = await getArticles()
    const article_list = document.getElementById("article-list")

    articles.forEach(article => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col");
        newCol.setAttribute("onclick", `articleDetail(${article.id})`)

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card");
        newCard.setAttribute("id", article.id);
        newCol.appendChild(newCard)
        // 이미지 정보
        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")
        if (article.image) {
            articleImage.setAttribute("src", `${backend_base_url}${article.image.image} `)
        } else {
            articleImage.setAttribute("src", `${noImage}`)
        }
        newCard.appendChild(articleImage)
        article_list.appendChild(newCol)
    }
    )
}

// 로그인 여부에 따라 로그인 페이지 or 이미지 변환 페이지 이동 
function handleMoveChange() {
    if (payload) {
        window.location.href = `${frontend_base_url}/doc/change.html`
    } else {
        window.location.href = `${frontend_base_url}/doc/login.html`
    }
}