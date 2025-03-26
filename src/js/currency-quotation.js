import { main } from "./services.js";
export { toggleMenu } from "./home.js";

function addOptionsCoinsInSelect(codeCoin) {
  const optionsLists = document.querySelectorAll("#select-coins select");

  optionsLists.forEach((list) => {
    const coinOption = document.createElement("option");

    coinOption.value = codeCoin;
    coinOption.textContent = codeCoin;
    list.appendChild(coinOption);
  });
}

async function addDatasInOption() {
  const coins = await main();

  coinsCode = coins.map(([key, value]) => {
    addOptionsCoinsInSelect(value.code);
  });
}

addDatasInOption();
