window.onload = () => {
    console.log('로딩')
}

async function handleSendmail() {
    let email = document.getElementById("email").value
    console.log(email)

    const response = await fetch(`${backend_base_url}/users/athnt/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email
        })
    })
    console.log(response)
    if (response.status == 200) {
        alert("이메일로 인증코드가 발송되었습니다")
    } else {
        alert("이미 가입된 이메일입니다.")
    }
}

async function handleSignup() {
    let email = document.getElementById("email").value
    const verify_code = document.getElementById("verify_code").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    console.log(email, verify_code, nickname, password)

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "verify_code":verify_code,
            "nickname": nickname,
            "password": password
        })
    })
    console.log(response)
    if (response.status == 201) {
        alert("회원가입 성공")
        window.location.replace(`${frontend_base_url}/doc/login.html`)
    } else if (response.status == 401) {
        alert("인증번호 불일치")
    } else {
        alert(response.status)
    }
}
