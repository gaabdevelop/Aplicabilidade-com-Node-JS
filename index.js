const puppeteer = require("puppeteer");

const URL = `https://www.google.com/search?q=previs%C3%A3o+do+tempo&rlz=1C1CHBD_pt-PTBR1092BR1092&oq=previs%C3%A3o&gs_lcrp=EgZjaHJvbWUqEQgAEEUYJxg7GJ0CGIAEGIoFMhEIABBFGCcYOxidAhiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYOzIGCAMQRRg5Mg0IBBAAGJIDGIAEGIoFMg0IBRAAGJIDGIAEGIoFMgYIBhBFGD0yBggHEEUYPKgCALACAA&sourceid=chrome&ie=UTF-8`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle2" });

  await page.screenshot({ path: "./print.jpeg" });

  let data = await page.evaluate(() => {
    let temperatura = document.querySelector(".wob_t.q8U8x").innerHTML;
    let chuva = document.querySelector("#wob_pp").innerHTML;
    let umidade = document.querySelector("#wob_hm").innerHTML;
    let vento = document.querySelector("#wob_ws").innerHTML;
    let tempo = document.querySelector("#wob_dc").innerHTML;
    return {
      temperatura,
      chuva,
      umidade,
      vento,
      tempo,
    };
  });

  console.log("Temperatura: " + data.temperatura + "°C");
  console.log("Chance de Chover: " + data.chuva);
  console.log("Umidade: " + data.umidade);
  console.log("Velocidade do Vento: " + data.vento);
  console.log(data.tempo);

  await browser.close();
})();
