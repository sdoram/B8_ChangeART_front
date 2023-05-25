console.log('메인 페이지 연결')
console.log('?' + document.location.href.split('?')[1])
const currentPage = '?' + document.location.href.split('?')[1]

// 게시글 리스트 불러오기 
async function getArticles() {
    const response = await fetch(`${backend_base_url}/home/${currentPage}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        return response_json.results
    } else {
        alert('게시글 로딩 실패')
    }
}


// 페이지네이션
// 첫 페이지, 마지막 페이지 도착시 버튼 비활성화 필요 
// ?page=2&undefined= 뒤에 붙는 undefined 제거하기
// 이전 페이지 보기
async function previousPage() {
    const response = await fetch(`${backend_base_url}/home/${currentPage}`, {
    })
    const response_json = await response.json()
    console.log('이전 페이지 클릭')
    if (response_json.previous) {
        location.href = `${frontend_base_url}/index.html${response_json.previous.split('/')[4]}`
    } else {
        alert('이전 페이지가 없습니다.')
    }
}
// 다음 페이지 보기
async function nextPage() {
    const response = await fetch(`${backend_base_url}/home/${currentPage}`, {
    })
    const response_json = await response.json()
    console.log('다음 페이지 클릭')
    if (response_json.next) {
        location.href = `${frontend_base_url}/index.html${response_json.next.split('/')[4]}`
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
    console.log(articles)
    const article_list = document.getElementById("article-list")

    // Array.from(articles).forEach(article => {
    articles.forEach(article => {
        console.log(article)
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

// 로그인 여부에 따라 로그인 페이지 or 글작성 페이지
function handleMoveCreate() {
    if (payload) {
        window.location.href = `${frontend_base_url}/doc/create.html`
    } else {
        window.location.href = `${frontend_base_url}/doc/login.html`
    }
    console.log('게시글 작성 이동 버튼')
}

// 이미지 변환 페이지 이동 
function handleMoveChange() {
    console.log('이미지 변환 이동 버튼')
    window.location.href = `${frontend_base_url}/doc/change.html`
}