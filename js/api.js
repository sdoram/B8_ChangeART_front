// 전체 적용 js
const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access");

const noImage = "https://github.com/sdoram/sdoram/assets/108051577/68aa56dc-3605-4f70-a8b7-044109871a38"


function checkLogin() {
    console.log('로그인 js 연결 체크')
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}
