const puppeteer = require("puppeteer");

const signInButtonSelector = ".auth-button.signed-out";
const githubLoginSelector = "#login_field";
const githubPasswordSelector = "#password";
const githubSignInBtnSelector = ".btn.btn-primary.btn-block";

const travisRebuildBtnSelector = ".action-button--restart";

const width = 1200;
const height = 600;

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`]
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto("https://travis-ci.org/");
  await page.waitForSelector(signInButtonSelector);
  await page.click(signInButtonSelector);
  await page.waitFor(4000);
  await page.type(githubLoginSelector, "****");
  await page.type(githubPasswordSelector, "****");
  await page.click(githubSignInBtnSelector);
  await page.waitFor(4000);

  for (let i = 1; i <= 6; ++i) {
    await page.goto(`https://travis-ci.org/***${i}`);
    await page.waitForSelector(travisRebuildBtnSelector);
    await page.click(travisRebuildBtnSelector);
    await page.waitFor(4000);
  }

  await browser.close();
};
