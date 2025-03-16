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

const coins = Object.entries(getValues());

async function main() {
  const coinsData = await getValues();

  const coins = Object.entries(coinsData);

  const coinsList = coins.map(([key, value]) => {
    return {
      code: value.code,
      pricing: parseFloat(value.bid).toFixed(2),
      change: parseFloat(value.pctChange).toFixed(2),
    };
  });

  return coinsList;
}

main();

export default main;
