import { readData } from '../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData('./02/input-a.txt');
  //12 red cubes, 13 green cubes, and 14 blue cubes

  let sum = 0;
  data.map((game) => {
    const cubes = splitIntoColorCounts(game);
    const gameNumber = extractGameNumber(game);

    let greatestB = 0;
    let greatestR = 0;
    let greatestG = 0;
    for (let i = 0; i < cubes.length; i++) {
      const blue = sumColorValues(cubes[i], 'blue');
      if (blue && blue > greatestB) {
        greatestB = blue;
      }
      const red = sumColorValues(cubes[i], 'red');
      if (red && red > greatestR) {
        greatestR = red;
      }
      const green = sumColorValues(cubes[i], 'green');
      if (green && green > greatestG) {
        greatestG = green;
      }
    }

    sum += greatestB * greatestG * greatestR;
    console.log(gameNumber, cubes);
  });

  console.log(data);
  return sum;
}

function sumColorValues(input: string, color: string): number | null {
  const regex = new RegExp(`(\\d+)\\s+${color}`, 'g');

  let match;
  while ((match = regex.exec(input)) !== null) {
    return parseInt(match[1]);
  }
  return null;
}

function extractGameNumber(input: string): number {
  const match = input.match(/Game (\d+)/);

  return parseInt(match[1]);
}

function splitIntoColorCounts(input: string): string[] {
  const colorPart = input.replace(/Game \d+:/, '');

  return colorPart.split(/[,;]/).map((s) => s.trim());
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
