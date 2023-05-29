// 전체 적용 js
const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access");

const noImage = "https://github.com/sdoram/B8_ChangeART_front/assets/122615809/8051b2fc-035a-44db-9aa7-0533afacc6cb"

const noProfileImage = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmC5jq%2FbtshzYZQFIL%2FkKMAW65wigPLiKvVkfQkTk%2Fimg.png"


function checkLogin() {
    console.log('로그인 js 연결 체크')
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

// 로그인 여부에 따라 로그인 페이지 or 글작성 페이지
function handleMoveCreate() {
    if (payload) {
        window.location.href = `${frontend_base_url}/doc/create.html`
    } else {
        window.location.href = `${frontend_base_url}/doc/login.html`
    }
}
