import { readFile } from 'fs/promises';

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName))
    .toString()
    .replace(/\r\n/g, '\n') // Replace CRLF with LF
    .split('\n');
  return data;
}
