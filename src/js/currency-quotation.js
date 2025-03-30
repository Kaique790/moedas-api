import { getValues, main } from "./services.js";
export { toggleMenu } from "./home.js";

const url = "https://economia.awesomeapi.com.br/json/all";

function addOptionsCoinsInSelect(codeCoin) {
  const optionsLists = document.querySelectorAll("#converter-coins select");

  optionsLists.forEach((list) => {
    const coinOption = document.createElement("option");

    coinOption.value = codeCoin;
    coinOption.textContent = codeCoin;
    list.appendChild(coinOption);
  });
}

async function addDatasInOption() {
  const coins = await main(url);

  const coinsCode = coins.map(([key, value]) => {
    return value.code;
  });

  coinsCode.forEach((coinCode) => {
    addOptionsCoinsInSelect(coinCode);
  });
}

async function getCoinsValue(firstCoinCode, lastCoinCode) {
  const coinsProvided = await getValues(
    `https://economia.awesomeapi.com.br/last/${firstCoinCode}-BRL,${lastCoinCode}-BRL`
  );

  const firstCoinValue = coinsProvided[`${firstCoinCode}BRL`].bid;
  const lastCoinValue = coinsProvided[`${lastCoinCode}BRL`].bid;
}

addDatasInOption();

// Validations

const form = document.getElementById("converter-coins");

const valueProvidedInput = document.getElementById("value-provided");
const htmlResult = document.getElementById("conversion-result");

const firstCoinProvided = document.getElementById("first-coin-provided");
const lastCoinProvided = document.getElementById("last-coin-provided");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValueValid = validateValueProvided(valueProvidedInput);
  const isFirstCoinValid = validateCoinProvided(firstCoinProvided);
  const isLastCoinValid = validateCoinProvided(lastCoinProvided);

  getCoinsValue(firstCoinProvided.value, lastCoinProvided.value);

  if (isValueValid && isFirstCoinValid && isLastCoinValid) {
    htmlResult.textContent = (valueProvidedInput.value * 10).toFixed(2);
  }
});

function validateValueProvided(input) {
  if (
    input.value < 0 ||
    input.value === undefined ||
    isNaN(input.value) ||
    input.value == ""
  ) {
    input.classList.add("error");
    return false;
  }

  input.classList.remove("error");
  return true;
}

function validateCoinProvided(select) {
  if (select.value == 0) {
    select.classList.add("error");
    return false;
  }

  select.classList.remove("error");
  return true;
}
