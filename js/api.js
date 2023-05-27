// 전체 적용 js
const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access");

const noImage = "https://github.com/sdoram/B8_ChangeART_front/assets/122615809/8051b2fc-035a-44db-9aa7-0533afacc6cb"


function checkLogin() {
    console.log('로그인 js 연결 체크')
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}
