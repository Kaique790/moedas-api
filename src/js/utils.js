// loading in promises
export function SetLoading(isloading, parent, posLoadtext) {
  const loading = document.createElement("span");
  parent.disabled = true;

  if (isloading === false) {
    loading.classList.remove("loading");
    parent.innerText = posLoadtext;
    parent.disabled = false;
    return;
  }

  loading.classList.add("loading");
  parent.innerHTML = "";
  parent.appendChild(loading);
}

//Menu mobile
const showNav = document.getElementById("show-nav");
const backNav = document.getElementById("back-nav");
const headerNav = document.getElementById("header-nav");

backNav.addEventListener("click", () => toggleMenu());
showNav.addEventListener("click", () => toggleMenu());

export function toggleMenu() {
  headerNav.classList.toggle("active");
}
