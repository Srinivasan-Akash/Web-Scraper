const playwright = require("playwright");
const XLSX = require("xlsx");
const HtmlTableToJson = require('html-table-to-json');

async function main() {
  const browser = await playwright["chromium"].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scrapedData = new Array();

  await page.route(/(analytics|fonts)/, (route) => route.abort());
  await page.goto(
    "https://www.oktatas.hu/hivatali_ugyek/kir_intezmenykereso",
    { timeout: 360000 }
  );
  await page.waitForLoadState(`load`);

  const selectNoRecords = await page.$("#SearchFormConditions_PageSize")
  selectNoRecords?.selectOption("50")

  const submit = await page.$("#keres")
  await submit.click()
  await page.waitForTimeout(2000);

  const loader = await page.$("#panel_loadinfo")
  await loader.waitForElementState("hidden");
  
  const records = await page.$$(".base_data_table tbody")
  const schoolName = await page.$$(".name_intezmeny_link")

  for (let index in records) {
    scrapedData.push({
        schoolName: await schoolName[index].innerText(),
        CAP: await (await records[index].innerText()).match(/(\d{4})+/g).at(-1),
        schoolCode: (await (await records[index].innerText()).match(/(\d{6})+/g))[0],
        city: (((await (await records[index].innerText()).split(","))[1]).split("."))[0]
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
  XLSX.writeFile(workBook, "./hungary.xlsx");
};

main();
