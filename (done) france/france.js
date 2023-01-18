const playwright = require("playwright");
const XLSX = require("xlsx");

async function main() {
  const browser = await playwright["chromium"].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scrapedData = new Array();

  await page.route(/(analytics|fonts)/, (route) => route.abort());
  await page.goto("https://www.education.gouv.fr/annuaire?keywords=&department=&academy=&status=All&establishment=All&geo_point=",{ timeout: 360000 });
  await page.waitForLoadState(`load`);

  const schoolNames = await page.$$(".establishment--search_item__content h2");
  const contact = await page.$$(".establishment--search_item__address");
//   const emails = await page.$$(".sc-tab-email.sc-col-5");
//   const codice = await page.$$(".sc-tab-plesso.sc-col-1 span");
  const address = await page.$$(".establishment--address-line");

  for (let index in schoolNames) {
    scrapedData.push({
        schoolName: await schoolNames[index].innerText(),
        telephone: await (await contact[index].innerText()).match(/[\+]?\d{10}/) ? await (await contact[index].innerText()).match(/[\+]?\d{10}/)[0] : "Not Provided in Website",
        email: await ((await contact[index].innerText()).slice(await (await contact[index].innerText()).search("Email") + 8)),
        CAP: await (await address[index].innerText()).match(/(\d{5})+/g).at(-1),
        city: await (await address[index].innerText()).split(await (await address[index].innerText()).match(/(\d{5})+/g).at(-1) + " ").pop(),
        // codice: await codice[index].innerText()
    });
  }

  convertToExcel(scrapedData);
}

const convertToExcel = (data) => {
  console.log(data);
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "./france.xlsx");
};

main();
