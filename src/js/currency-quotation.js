import { getValues, main } from "./services.js";
import { SetLoading } from "./utils.js";

const buttonSubmit = document.getElementById("converter-button");
const form = document.getElementById("converter-coins");

const valueProvidedInput = document.getElementById("value-provided");
const firstCoinProvided = document.getElementById("first-coin-provided");
const lastCoinProvided = document.getElementById("last-coin-provided");

const htmlResult = document.getElementById("conversion-result");

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

export async function getCoinValue(currency) {
  currency = currency.toUpperCase();
  if (currency === "USD") return 1;

  try {
    const url = `https://economia.awesomeapi.com.br/last/${currency}-usd`;

    const coin = await getValues(url);
    const coinValue = coin[`${currency}USD`].bid;

    return coinValue;
  } catch (err) {
    console.error(err);
    alert("Ocorreu um erro ao carregar as moedas do awesomeAPI");
  }
}

async function convertCurrencies(value, fromCurrency, toCurrency) {
  let firstValue = await getCoinValue(fromCurrency);
  let lastValue = await getCoinValue(toCurrency);

  const result = value * (firstValue / lastValue);
  return result;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const isValueValid = validateValueProvided(valueProvidedInput);
  const isFirstCoinValid = validateCoinProvided(firstCoinProvided);
  const isLastCoinValid = validateCoinProvided(lastCoinProvided);

  const isFormValid = isValueValid && isFirstCoinValid && isLastCoinValid;

  if (firstCoinProvided.value === lastCoinProvided.value) {
    lastCoinProvided.classList.add("error");
    firstCoinProvided.classList.add("error");
    return;
  }

  if (!isFormValid) return;

  try {
    SetLoading(true, buttonSubmit, "");
    const result = await convertCurrencies(
      valueProvidedInput.value,
      firstCoinProvided.value,
      lastCoinProvided.value,
    );

    htmlResult.textContent = parseFloat(result.toFixed(6));
  } catch (err) {
    alert("Ocorreu um erro ao converter a moeda");
  } finally {
    return SetLoading(false, buttonSubmit, "Converter");
  }
});

// Validations

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
  if (select.value === "0") {
    select.classList.add("error");
    return false;
  }

  select.classList.remove("error");
  return true;
}

addDatasInOption();
