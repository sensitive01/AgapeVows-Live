const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText || "-"));

  await page.setViewport({ width: 390, height: 844 });
  
  console.log("Navigating to FAQ...");
  await page.goto('http://localhost:5173/faq-page', { waitUntil: 'networkidle2' });
  let text1 = await page.$eval('#root', el => el.innerHTML);
  console.log("FAQ content length:", text1.length);
  
  console.log("Navigating to Blogs...");
  await page.goto('http://localhost:5173/user/blogs-page', { waitUntil: 'networkidle2' });
  let text2 = await page.$eval('#root', el => el.innerHTML);
  console.log("Blogs content length:", text2.length);
  
  await browser.close();
})();
