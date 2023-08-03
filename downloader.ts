import * as puppeteer from 'puppeteer';
import nodeFetch from "node-fetch";
import * as fs from 'fs';

export const getCategories = async (url: string) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({
            width: 1200,
            height: 800
        });

        await autoScroll(page);

        let products = await getProducts(page)

        for (let product of products) {
            console.log(product.url)
            await page.goto(product.url);
            let details = await getDetail(page, product);
            product.tags = details.tags;
            product.img = details.img;
            console.log(product.img)
            await downloadImage(product.img);
        };

        fs.writeFileSync('frontend/src/lib/products.json', JSON.stringify(products, null, 2));
        await browser.close();
    } catch (error) {
        console.error(error);
    }
}

async function autoScroll(page: puppeteer.Page) {
    await page.evaluate(async () => {
        for (let i = 0; i < 5; i++) {

            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 1000;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve(123);
                    }
                }, 1000);
            });
        }
    });
}

export interface Product {
    tags: string[] | null;
    img: string | null;
    title: string,
    price: number,
    availability: string,
    number: number | null,
    url: string
}

async function getDetail(page: puppeteer.Page, product: Product) {
    try {
        await page.waitForSelector('.easyzoom', { timeout: 10000 })
    }
    catch (error) {
        console.error("no image found")
    }
    return await page.evaluate(async () => {
        let tagElements = document.querySelectorAll('.breadcrumb-item');
        let tags = [];
        tagElements.forEach(element => {
            tags.push((element as HTMLElement).innerText);
        });
        tags = tags.filter(tag => tag != 'Home');

        let zoomContainer = document.querySelector('.easyzoom');
        let img = "not found";
        if (zoomContainer != null)
            img = (zoomContainer.querySelector('img') as HTMLElement).getAttribute('src');
        product.img = img;
        product.tags = tags;

        return {
            tags: tags,
            img: img
        };
    });


}

async function getProducts(page: puppeteer.Page): Promise<Product[]> {
    return await page.evaluate(() => {
        let main = document.querySelectorAll('section [id="main"]')
        let articles = main[0].querySelectorAll('article')
        let retvalue = []
        articles.forEach(element => {
            let title = (element.querySelector('.product-title a') as HTMLElement).innerText
            let price: number = +(element.querySelector('.current-price-discount') as HTMLElement).innerText.replace(',', '').replace('kr', '');
            let availability = (element.querySelector('.label') as HTMLElement).textContent.replace('\\n', '').trim().replace(/[^\x00-\x7F]/g, "");
            let number: number = +(element.querySelector('.product-quantities>span') as HTMLElement).innerText.trim();
            let url = (element.querySelector('a') as HTMLElement).getAttribute('href');
            retvalue.push({
                title: title,
                price: price,
                availability: availability,
                number: number,
                url: url
            })
        });
        return retvalue
    });
}

async function downloadImage(img: string) {
    if (img === "not found")
        return;

    const filename = "frontend/static/" + img.split('/').pop();
    console.log(`Downloading ${filename}`);
    // if file does not exist, download it
    if (fs.existsSync(filename)) {
        console.log(`${filename} already exists`);
        return;
    }
    const res = await nodeFetch(img);

    const fileStream = fs.createWriteStream(filename);
    res.body.pipe(fileStream);
    res.body.on("error", (err) => {
        console.error(err);
    });
    res.body.on("finish", () => {
        console.log(`Downloaded ${filename}`);
    });
}

