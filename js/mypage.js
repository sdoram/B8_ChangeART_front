console.log('마이페이지 연결 확인')
window.onload = async function getUser() {
    const response = await fetch(`${backend_base_url}/users/mypage/${payload_parse.user_id}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        // console.log(response_json.profile_image)
        // 유저 프로필 정보 
        const userNickName = document.getElementById('user-nickname')
        const userEmail = document.getElementById('user-email')
        userNickName.innerText = response_json.nickname
        userEmail.innerText = response_json.email

        // 유저 프로필 사진 정보
        const userProfileImage = document.getElementById('user-profile-image')
        if (response_json.profile_image) {
            const profile = document.createElement("img")
            profile.setAttribute("src", `${backend_base_url}${response_json.profile_image}`)
            userProfileImage.append(profile)
        } else {
            const profile = document.createElement("img")
            profile.setAttribute("src", `${backend_base_url}${NoImage}`)
            userProfileImage.append(profile)
        }


        // 팔로잉, 팔로우 정보
        const userFollowersCount = document.getElementById('user-followers-count')
        const userFollowingCount = document.getElementById('user-following-count')
        const userFollowingList = document.getElementById('user-following-list')

        // 유저 게시글 정보
        const userArticles = document.getElementById('user-articles')



        return response_json

    } else {
        alert(response.status)
    }
}