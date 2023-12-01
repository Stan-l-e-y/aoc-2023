import { readData } from '../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData('./01/input-a.txt');
  let sum = 0;
  let first: null | number = null;
  let last: null | number = null;
  data.map((doc) => {
    for (let i = 0; i < doc.length; i++) {
      if (!first && !isNaN(parseFloat(doc[i]))) {
        first = parseFloat(doc[i]);
        last = parseFloat(doc[i]);
      } else if (!isNaN(parseFloat(doc[i]))) {
        last = parseFloat(doc[i]);
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

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
