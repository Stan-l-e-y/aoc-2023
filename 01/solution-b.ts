import { readData } from '../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const data = await readData('./01/input-a.txt');
  let sum = 0;
  let first: null | number = null;
  let last: null | number = null;
  let numberMap = new Map<string, number>([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
  ]);
  data.map((doc) => {
    for (let i = 0; i < doc.length; i++) {
      if (!first && !isNaN(parseFloat(doc[i]))) {
        first = parseFloat(doc[i]);
        last = parseFloat(doc[i]);
      } else if (!isNaN(parseFloat(doc[i]))) {
        last = parseFloat(doc[i]);
      } else {
        //start substring loop
        let digit = '';
        for (let x = i; x < doc.length; x++) {
          digit += doc[x];
          //most it can be is seven, eight, three
          if (digit.length > 5) break;
          if (numberMap.has(digit)) {
            if (!first) {
              first = numberMap.get(digit)!;
              last = numberMap.get(digit)!;
            } else {
              last = numberMap.get(digit)!;
            }
          }
        }
      }

      if (i == doc.length - 1) {
        sum += Number(String(first) + String(last));
        first = null;
        last = null;
      }
    }
  });
  console.log(sum);
  return sum;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
