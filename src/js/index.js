async function getValues() {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,GBP-BRL"
    );
    const data = await response.json();

    const usdRate = data.USDBRL;
    const gbpRate = data.GBPBRL;

    const usdChangeElement = document.getElementById("usd-change");
    const gbpChangeElement = document.getElementById("gbp-change");

    const usdPrincingElement = document.getElementById("usd-princing");
    const gbpPrincingElement = document.getElementById("gbp-princing");
  
    usdPrincingElement.textContent = parseFloat(usdRate.bid).toFixed(2);
    gbpPrincingElement.textContent = parseFloat(gbpRate.bid).toFixed(2);

    usdChangeElement.textContent = `${parseFloat(usdRate.pctChange).toFixed(2)}% ${usdRate.pctChange > 0 ? '↑' : '↓'}`
    gbpChangeElement.textContent = `${parseFloat(gbpRate.pctChange).toFixed(2)}% ${gbpRate.pctChange > 0 ? '↑' : '↓'}`
  
    if (usdRate.pctChange < 0) {usdChangeElement.style.color = "red" }
    if (gbpRate.pctChange < 0){ gbpChangeElement.style.color = "red" }
  } catch (err) {}
}

getValues();
