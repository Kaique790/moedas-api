import { getValues, main } from "./services.js";
export { toggleMenu } from "./home.js";

const buttonSubmit = document.getElementById("converter-button");

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
addDatasInOption();

// Validations

async function getCoinsValue(value, currencyProvided, converTo) {
  const coinsProvided = await getValues(
    `https://economia.awesomeapi.com.br/last/${currencyProvided}-${converTo}`
  );
  const coin = `${currencyProvided}${converTo}`;
  const quoteValue = coinsProvided[coin].bid;

  const result = value * quoteValue;
  return result;
}

const form = document.getElementById("converter-coins");

const valueProvidedInput = document.getElementById("value-provided");
const htmlResult = document.getElementById("conversion-result");

const firstCoinProvided = document.getElementById("first-coin-provided");
const lastCoinProvided = document.getElementById("last-coin-provided");

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

  SetLoading(true, buttonSubmit, " ");

  let result = 0;

  if (isFormValid) {
    try {
      result = await getCoinsValue(
        valueProvidedInput.value,
        firstCoinProvided.value,
        lastCoinProvided.value
      );

      if (result === undefined) {
        SetLoading(false, buttonSubmit, "Erro ao converter moeda");
        return;
      }

      htmlResult.textContent = result.toFixed(2);
      return;
    } catch (error) {
      return SetLoading(false, buttonSubmit, "Error ao converter moeda");
    } finally {
      return SetLoading(false, buttonSubmit, "Converter");
    }
  }

  return SetLoading(false, undefined, "Converter");
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
