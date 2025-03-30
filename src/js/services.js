export async function getValues(url) {
  try {
    const response = await fetch(url);

    const coins = await response.json();

    return coins;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function main(url) {
  const coinsData = await getValues(url);

  const coins = Object.entries(coinsData);

  return coins;
}
