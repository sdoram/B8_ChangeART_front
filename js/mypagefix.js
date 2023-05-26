window.onload = () => {
    console.log('로딩')
}

async function fixingUserInfo() {
    const user_id = payload_parse.user_id
    const password = document.getElementById("password").value;
    const nickname = document.getElementById("nickname").value;
    const profile_image = document.getElementById("profile_image").files[0];

    const formdata = new FormData();
    
    if (password) {
        formdata.append("password", password)
    }
    if (nickname) {
        formdata.append("nickname",nickname)
        console.log(formdata)
    }
    if (profile_image) {
        formdata.append("profile_image",profile_image)
    }
    
    console.log(formdata)
    const response = await fetch(`${backend_base_url}/users/mypage/${user_id}/`, {
    headers: {
        "Authorization": `Bearer ${token}`
    },
    method: 'PUT',
    body: formdata
}) 
if (response.status == 200) {
    alert("수정완료")
    window.location.href = `${frontend_base_url}/doc/mypage.html?user_id=${user_id}`
} else {
    alert(response.status)
}}


async function withDrawUser() {
    let user_id = payload_parse.user_id
    const response = await fetch(`${backend_base_url}/users/mypage/${user_id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
    })
    if (response.status == 200) {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        response_json = await response.json()
        alert(response_json.message)
        window.location.href = `${frontend_base_url}`
    } else if (response.status == 400) {
        response_json = await response.json()
        alert(response_json.message)
        window.location.href = `${frontend_base_url}`
    } else {
        console.log(response.status)
}}
