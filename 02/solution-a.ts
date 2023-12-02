import { readData } from '../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const data = await readData('./02/input-a.txt');
  //12 red cubes, 13 green cubes, and 14 blue cubes

  let sum = 0;
  data.map((game) => {
    const cubes = splitIntoColorCounts(game);
    const gameNumber = extractGameNumber(game);

    let isPossible = true;

    for (let i = 0; i < cubes.length; i++) {
      const blue = sumColorValues(cubes[i], 'blue');
      if (blue && blue > 14) {
        isPossible = false;
        break;
      }
      const red = sumColorValues(cubes[i], 'red');
      if (red && red > 12) {
        isPossible = false;
        break;
      }
      const green = sumColorValues(cubes[i], 'green');
      if (green && green > 13) {
        isPossible = false;
        break;
      }
    }
    if (isPossible) sum += gameNumber;
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

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
