import main from "./services.js";
const showNav = document.getElementById("show-nav");
const backNav = document.getElementById("back-nav");

backNav.addEventListener("click", () => toggleMenu());
showNav.addEventListener("click", () => toggleMenu());

const headerNav = document.getElementById("header-nav");

function toggleMenu() {
  headerNav.classList.toggle("active");
}

function addTrInTable(coin, pricing, change) {
  const ratesTableBody = document.getElementById("rates-body");

  const trElement = document.createElement("tr");

  const coinTd = document.createElement("td");
  coinTd.textContent = coin;

  const princingTd = document.createElement("td");
  princingTd.textContent = `${pricing}R$`;

  const changeTd = document.createElement("td");

  changeTd.textContent = `|${change}%`;

  if (change > 0) {
    changeTd.textContent = `↑ ${change}%`;
  }

  if (change < 0) {
    changeTd.textContent = `↓ ${change}%`;
    changeTd.style.color = "red";
  }

  trElement.appendChild(coinTd);
  trElement.appendChild(princingTd);
  trElement.appendChild(changeTd);

  ratesTableBody.appendChild(trElement);
}

async function addDatasInTable() {
  const coinsList = await main();
  const tableExists = document.getElementById("rates-body");

  if (tableExists) {
    coinsList.forEach(({ code, pricing, change }) => {
      addTrInTable(code, pricing, change);
    });
  }
}

addDatasInTable();
