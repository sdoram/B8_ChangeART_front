async function injectNavbar() {
    fetch("./navbar.html")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        document.querySelector("header").innerHTML = data;
      });
    let navbarHtml = await fetch("./navbar.html");
    let data = await navbarHtml.text();
    document.querySelector("header").innerHTML = data;
  
    const payload = localStorage.getItem("payload");
    if (payload) {
      const payload_parse = JSON.parse(payload);
      console.log(payload_parse.email);
  
      const intro = document.getElementById("intro");
      intro.innerText = `${payload_parse.nickname}님 안녕하세요`;
  
      let navbarLeft = document.getElementById("navbar-left");
      let articleCreateLi = document.createElement("li");
      articleCreateLi.setAttribute("class", "nav-item");
  
      let articleCreateLink = document.createElement("a");
      articleCreateLink.setAttribute("href", "/article_create.html");
      articleCreateLink.setAttribute("class", "nav-link");
      articleCreateLink.innerHTML = "글 작성";
  
      articleCreateLi.appendChild(articleCreateLink);
      navbarLeft.appendChild(articleCreateLi);
  
      let navbarRight = document.getElementById("navbar-right");
      let newLi = document.createElement("li");
      newLi.setAttribute("class", "nav-item");
  
      let logoutBtn = document.createElement("button");
      logoutBtn.setAttribute("class", "nav-link btn");
      logoutBtn.innerText = "로그아웃";
      logoutBtn.setAttribute("onClick", "handleLogout()");
  
      newLi.appendChild(logoutBtn);
  
      navbarRight.appendChild(newLi);
  
      let loginButton = document.getElementById("login-button");
      loginButton.style.display = "none";
    }
  }
  
  injectNavbar();