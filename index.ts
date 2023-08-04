import { getCategories } from './downloader';
import * as fs from 'fs';

console.log("downloading order")
const order = await getCategories('https://www.fantasianorth.com/en/561-grand-alliance-order');
console.log(JSON.stringify(order, null, 2))

console.log("downloading desctruction")
const destruction = await getCategories('https://www.fantasianorth.com/en/564-grand-alliance-destruction');
console.log(JSON.stringify(destruction, null, 2))

console.log("downloading chaos")
const chaos = await getCategories('https://www.fantasianorth.com/en/562-grand-alliance-chaos');
console.log(JSON.stringify(chaos, null, 2))

console.log("downloading death")
const death = await getCategories('https://www.fantasianorth.com/en/563-grand-alliance-death');
console.log(JSON.stringify(death, null, 2))

console.log("downloading start")
const start = await getCategories('https://www.fantasianorth.com/en/541-start-collecting');
console.log(JSON.stringify(start, null, 2))

console.log("concatinating")
const tot = [...destruction, ...order, ...chaos, ...death, ...start].sort((a, b) => a.title.localeCompare(b.title));

const map = new Map();
for (const item of tot) {
    map.set(item.title, item);
}
const tot_dedupe = Array.from(map.values());


console.log("writing to file")
fs.writeFileSync('frontend/src/lib/products.json', JSON.stringify(tot_dedupe, null, 2));
