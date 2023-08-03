import { getCategories } from './downloader';
import * as fs from 'fs';

// console.log("downloading order")
// const order = await getCategories('https://www.fantasianorth.com/en/561-grand-alliance-order');
// console.log(JSON.stringify(order, null, 2))
// console.log("downloading desctruction")
// const destruction = await getCategories('https://www.fantasianorth.com/en/564-grand-alliance-destruction');
// console.log(JSON.stringify(destruction, null, 2))
// console.log("downloading chaos")
// const chaos = await getCategories('https://www.fantasianorth.com/en/562-grand-alliance-chaos');
// console.log(JSON.stringify(chaos, null, 2))

// console.log("concatinating")
// const tot = [...destruction, ...order, ...chaos];
const tot = await getCategories('https://www.fantasianorth.com/en/137-aos');
console.log("writing to file")
fs.writeFileSync('frontend/src/lib/products.json', JSON.stringify(tot, null, 2));
