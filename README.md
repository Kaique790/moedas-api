# moedas-api

Projeto desenvolvido com HTML, TailwindCSS e JavaScript.

Para editar basta apenas ter o node instalado e fazer os seguintes comandos:
- npm i
- npm run dev

*O Projeto tem em mente consolidar fundamentos de JavaScript e chamadas para API e apurar a lógica de programação.
A única coisa usada de diferente foi o Tailwind, para agilizar a estilização, o restante foi HTMl e JavaScript puro.
Escolhi esse projeto para ter uma base de trabalho sério com API's e muitos dados e seus cruzamnetos, algo muito comum no dia-a-dia de um desenvolvedor.*

---

## Fases
- 1. Capturar as moedas e mostrá-las em telas
- 2. Converter as moedas

### Capturando moedas
Parte mais fácil, foi apenas capturá-las pela api púplica do awesomeAPI, transformá-las em um array (awesomeAPI às retorna como objeto). Desse array, para cada moeda foi adicionado uma linha na tabela e os dados foram formatados e alocados. 

### Convertendo moedas

### Parte 1:
Parte mais demorada, a conversão é simples, é apenas pegar o valor que quero e multiplicar pelo cotação da moeda na moedas em que será convertido.

**Ex**:

cotação do dólar em real = 4.5

conversão = valor * cotação

``` javascript
const value = prompt("Digite um valor")
const brlInUsd = 4.5
const result = value * brlInUsd
alert("result")

// É só testar
```
OBS: Os valores e as funções são só pequenos exemplos. A realidade envolve tratamentos de erros, chamadas de outras funções, etc. 😉

---
 
### Parte 2:
O mais complicado fica quando o awesomAPI não retorna dados de certas moedas em outras, daí temos que buscar a cotação ao inverso para dividir o valor que queremos pela cotação ao inverso.

**Ex**:

Vamos supor que queremos o valor de 1 dólar em etherium

1. cotação do dólar em etherium = error🚫

2. Vamos buscar o inverso:
cotação do etherium em dólar = 2000🚫

3. conversão = valor / cotação inversa

``` javascript
const value = prompt("Digite um valor")
const usdINEth = "error"

if(usdInEth === "error") {
  ethInUsd = 2000
  const inverse = ethInUsd
  const result = value / ethInUsd
  alert("result")
}

// É só testar
```
OBS: Os valores e as funções são só pequenos exemplos. A realidade envolve tratamentos de erros, chamadas de outras funções, etc. 😉

---

### Parte 3
Ele também não acha uma cripto moeda na cotação de outra, então teremos que fazer a busca das moedas em uma outra moeda em comum, tipo o USD, para daí fazer a conversão.

- Em andamento...

