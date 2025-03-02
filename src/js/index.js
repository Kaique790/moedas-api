async function getValues () {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,GBP-BRL');
        const data = await response.json();

        const usdRate = data.USDBRL;
        const gpbRate = data.GBPURL;

        const usdChangeElement = document.getElementById()
    } catch (err) {

    }
}

getValues();