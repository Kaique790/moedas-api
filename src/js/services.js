async function getValues() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/json/all");

    const coins = await response.json();

    return coins;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function main() {
  const coinsData = await getValues();

  const coins = Object.entries(coinsData);

  return coins;
}
