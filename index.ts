import { getCategories } from './downloader';

const categories = await getCategories('https://www.fantasianorth.com/en/564-grand-alliance-destruction');
console.log(categories);