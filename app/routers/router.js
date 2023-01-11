const { verifyToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { userAuthRoutes } = require("./user/auth");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../graphql/configs/graphql.config");
const puppeteer = require( 'puppeteer');
const router = require("express").Router();
const fs = require("fs");
const { time } = require("console");

// (async () =>{
//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//         // ignoreHTTPSErrors: true,
//         // args: [--window-size=1920,1080],
//         defaultViewport:{
//             width: 1920,
//             height:1080
//         }
//         // userDataDir: '%userprofile%\\AppData\\Local\\Google\\Chrome\\User Data\\AllowCookies'
//       });
//     const page = await browser.newPage();
  
//     // await page.goto('https://www.digikala.com/product/dkp-8514483/%D8%B4%D8%A7%D8%B1%DA%98%D8%B1-%D9%87%D9%85%D8%B1%D8%A7%D9%87-%D9%84%DB%8C%D8%AA%D9%88-%D9%85%D8%AF%D9%84-lp-22-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-20000-%D9%85%DB%8C%D9%84%DB%8C-%D8%A2%D9%85%D9%BE%D8%B1-%D8%B3%D8%A7%D8%B9%D8%AA/');
//     // const element = await page.waitForSelector('div[data-cro-id=pdp-album-open]');
//     // await element.click()
//     await page.goto('http://digikala.com');
//     const element = await page.waitForSelector('div[data-cro-id=searchbox-click]');
//     await element.click()
//     // await page.click('input[class=px-2')
//     await page.type('input[placeholder=جستجو]', "a23")
//     await page.keyboard.press('Enter')
//     const random = Math.floor((Math.random() * 19 ) + 1)
//     // setTimeout()
//     await page.waitForNavigation(10000, 'networkidle2')
//     const product = await page.waitForSelector(`div[data-product-index='${random}']`);
//     console.log(JSON.stringify(product))
//     await product.click('a[.pointer]')
//     const newPage = (await browser.pages())[2]
//     const productPage = async () =>{
//         // await newPage.waitForTimeout(30000)
//         const newProduct = await newPage.waitForSelector('div[.zoom_zoom__blur__Dx_DV]');
//         console.log(newProduct)
//         await newProduct.click()
//         await newPage.screenshot({fullPage: true ,path: `${new Date().getTime()}.jpg`});
//     }
//     setTimeout(productPage, 60000)
//     // console.log("111")

//     // var viewSource = await page.goto('https://dkstatics-public.digikala.com/digikala-products/f1c87b8f7903f67709194fc8c1816c6a6beb12aa_1652677678.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80');
//     // fs.writeFile(`./${new Date().getTime()}.jpg`, await viewSource.buffer(), function(err) {
//     // if(err) {
//     //     return console.log(err);
//     // }
//     //     console.log("The file was saved!");
//     // });


//     // await page.goto('http://localhost:2000/api-doc');
//     // const el = await page.waitForSelector('#operations-user-authorization-post_user_get_otp');
//     // await el.click()
//     // await page.click('.try-out__btn')
//     // await page.type('input[placeholder=mobile]', "09906345580")
//     // await page.click('.execute')
//     // await element.type('.px-2', 'A23')
//     // const allResultsSelector = '.pointer';
//     // await page.waitForSelector(allResultsSelector);
//     // await page.click(allResultsSelector);
// })();

router.use("/developer", DeveloperRoutes);
router.use("/user", userAuthRoutes);
router.use("/admin", verifyToken, AdminRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig))
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}