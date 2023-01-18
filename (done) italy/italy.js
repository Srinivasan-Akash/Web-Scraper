const playwright = require("playwright");
const XLSX = require("xlsx");

async function main() {
  const browser = await playwright["chromium"].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scrapedData = new Array();

  await page.route(/(analytics|fonts)/, (route) => route.abort());
  await page.goto(
    "https://cercalatuascuola.istruzione.it/cercalatuascuola/ricerca/risultati?codiceRegione=&codiceOrdine=&radioBiennioTriennio=Biennio&denominazione=&codMecc=&tipoRicerca=AVANZATA&gidf=1",
    { timeout: 360000 }
  );
  await page.waitForLoadState(`load`);

  const schoolNames = await page.$$(".sc-tab-plesso.sc-col-1 a");
  const telephone = await page.$$(".sc-tab-telefono.sc-col-4 a");
  const emails = await page.$$(".sc-tab-email.sc-col-5");
  const codice = await page.$$(".sc-tab-plesso.sc-col-1 span");
  const address = await page.$$(".sc-tab-indirizzo.sc-col-3");

  for (let index in schoolNames) {
    scrapedData.push({
        schoolName: await schoolNames[index].innerText(),
        telephone: await telephone[index].innerText(),
        email: await emails[index].innerText(),
        CAP: await (await address[index].innerText()).match(/(\d{5})+/g).at(-1),
        city: await (await address[index].innerText()).slice(-4),
        codice: await codice[index].innerText()
    });
  }

  convertToExcel(scrapedData);
}

const convertToExcel = (data) => {
  console.log(data);
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
  // buffer
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  // binary
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "./italy.xlsx");
};

main();
