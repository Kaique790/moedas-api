async function getValues(/*url*/) {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/json/all");

    const coins = await response.json();

    return coins;
  } catch (err) {
    console.error(err);
    return {};
  }
}

async function main(/*function = getValues*/) {
  const coinsData = await getValues();

  const coins = Object.entries(coinsData);

  //retornar somente a coins em forma de array, para ser mais abrangente

  const coinsList = coins.map(([key, value]) => {
    return {
      code: value.code,
      pricing: parseFloat(value.bid).toFixed(2),
      change: parseFloat(value.pctChange).toFixed(2),
    };
  });

  return coinsList;
}

export default main;
