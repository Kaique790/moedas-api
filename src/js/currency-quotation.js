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

export async function getCoinsValue(value, currencyProvided, converTo) {
  const url = ""`https://economia.awesomeapi.com.br/last/${currencyProvided}-${converTo}`;
  try {
    const coinProvided = await getValues(url);
    const coinCode = `${currencyProvided}${converTo}`;
    const quoteValue = parseFloat(coinProvided[coinCode].bid);

    if (isNaN(quoteValue)) {
      throw new Error(`Valor de cotação inválido para ${coinCode}`);
    }

    const result = value * quoteValue;
    return result;
  } catch (error) {
    throw new Error(error);
    console.error(error);
  }
}

async function inverseSearch(value = 1, fromCurrency, toCurrency) {
  try {
    const invertedRate = await getCoinsValue(1, toCurrency, fromCurrency);
    const result = value / invertedRate;

    htmlResult.textContent = result.toFixed(6);
  } catch (invertedError) {
    htmlResult.textContent = "Erro ao converter moedas.";
    console.error(
      "Conversão falhou em ambas as direções:",
      invertedError.message,
    );
  }
}

async function convertCurrency(value, fromCurrency, toCurrency) {
  try {
    const result = await getCoinsValue(value, fromCurrency, toCurrency);
    htmlResult.textContent = result.toFixed(2);
  } catch (error) {
    inverseSearch(value, toCurrency, fromCurrency);
  }
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
    convertCurrency(
      valueProvidedInput.value,
      firstCoinProvided.value,
      lastCoinProvided.value,
    );
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
