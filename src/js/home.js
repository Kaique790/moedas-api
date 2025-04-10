import { main } from "./services.js";
const showNav = document.getElementById("show-nav");
const backNav = document.getElementById("back-nav");

const url = "https://economia.awesomeapi.com.br/json/all";

backNav.addEventListener("click", () => toggleMenu());
showNav.addEventListener("click", () => toggleMenu());

const headerNav = document.getElementById("header-nav");

export function toggleMenu() {
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

  changeTd.textContent = `${change}%`;

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
  const coins = await main(url);
  const tableExists = document.getElementById("rates-body");

  const coinsList = coins.map(([key, value]) => {
    return {
      code: value.code,
      pricing: parseFloat(value.bid).toFixed(2),
      change: parseFloat(value.pctChange).toFixed(2),
    };
  });

  if (tableExists) {
    coinsList.forEach(({ code, pricing, change }) => {
      addTrInTable(code, pricing, change);
    });
  }
}

addDatasInTable();
