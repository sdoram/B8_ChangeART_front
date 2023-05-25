// 내비바 삽입 함수 
async function injectNavbar() {
  fetch("../doc/navbar.html").then(response => {
    return response.text()
  })
    .then(data => {
      document.querySelector("header").innerHTML = data;
    });
  let navbarHtml = await fetch("../doc/navbar.html");
  let data = await navbarHtml.text();
  document.querySelector("header").innerHTML = data;
  if (payload) {
    console.log(payload_parse.nickname);

    const intro = document.getElementById("intro");
    intro.innerText = `${payload_parse.nickname}님 안녕하세요`;

    // 내비바 왼쪽 항목
    let navbarLeft = document.getElementById("navbar-left");
    let articleCreateLi = document.createElement("li");
    articleCreateLi.setAttribute("class", "nav-item");

    let articleCreateLink = document.createElement("a");
    articleCreateLink.setAttribute("href", "../doc/create.html");
    articleCreateLink.setAttribute("class", "nav-link");
    articleCreateLink.innerHTML = "글 작성";

    articleCreateLi.appendChild(articleCreateLink);

    let imageCreateLi = document.createElement("li");
    imageCreateLi.setAttribute("class", "nav-item");

    let imageChangeLink = document.createElement("a");
    imageChangeLink.setAttribute("href", "../doc/change.html");
    imageChangeLink.setAttribute("class", "nav-link");
    imageChangeLink.innerHTML = "이미지 변환";

    imageCreateLi.appendChild(imageChangeLink);
    navbarLeft.appendChild(articleCreateLi);
    navbarLeft.appendChild(imageCreateLi);

    // 내비바 오른쪽 항목
    let navbarRight = document.getElementById("navbar-right");
    let logoutBtn = document.createElement("button");
    logoutBtn.setAttribute("class", "nav-link btn");
    logoutBtn.innerText = "로그아웃";
    logoutBtn.setAttribute("onClick", "handleLogout()");

    let myPageBtn = document.createElement("button");
    myPageBtn.setAttribute("class", "nav-link btn");
    myPageBtn.innerText = "내 정보";
    myPageBtn.setAttribute("onclick", "handleMyPage()");

    navbarRight.appendChild(myPageBtn);
    navbarRight.appendChild(logoutBtn);

    // payload 존재시 숨길 항목
    let loginButton = document.getElementById("login-button");
    let SignupButton = document.getElementById("signup-button");
    loginButton.style.display = "none";
    SignupButton.style.display = "none";
  }
}

// 로그아웃 함수 
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  location.reload();
}

injectNavbar();
